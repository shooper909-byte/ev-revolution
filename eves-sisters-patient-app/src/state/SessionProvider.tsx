import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AppState, View } from 'react-native';

import { karpa } from '@/integrations/karpa';
import { IntegrationError } from '@/integrations/karpa/errors';
import type { AuthUser } from '@/integrations/karpa/types';
import { recordAudit } from '@/services/audit';
import { APP_ALLOWED_ROLES } from '@/services/auth/permissions';
import { SESSION_KEY, secureStorage } from '@/services/auth/secureStorage';
import {
  createSession,
  endReasonMessage,
  needsTokenRefresh,
  sessionExpiry,
  touchSession,
  type Session,
  type SessionEndReason,
} from '@/services/auth/session';
import { track } from '@/services/analytics';

type Status = 'restoring' | 'signed-out' | 'signed-in';

type SessionContextValue = {
  status: Status;
  user: AuthUser | null;
  /** A message explaining why the last session ended, shown on the sign-in screen. */
  endNotice: string | null;
  clearEndNotice: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  signOut: (reason?: SessionEndReason) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  /** Registers user activity for the idle timer. */
  touch: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

const PERSIST_THROTTLE_MS = 30_000;
const CHECK_INTERVAL_MS = 30_000;
const systemNow = () => Date.now();

export function SessionProvider({ children, now = systemNow }: { children: ReactNode; now?: () => number }) {
  const [status, setStatus] = useState<Status>('restoring');
  const [session, setSession] = useState<Session | null>(null);
  const [endNotice, setEndNotice] = useState<string | null>(null);
  const sessionRef = useRef<Session | null>(null);
  const lastPersist = useRef(0);

  const persist = useCallback(async (next: Session | null) => {
    sessionRef.current = next;
    setSession(next);
    if (next) await secureStorage.set(SESSION_KEY, JSON.stringify(next));
    else await secureStorage.remove(SESSION_KEY);
  }, []);

  const end = useCallback(
    async (reason: SessionEndReason) => {
      const current = sessionRef.current;
      if (current) {
        recordAudit(reason === 'signed-out' ? 'auth.sign-out' : 'auth.session-expired', current.user.id, { reason });
        try {
          await karpa.auth.signOut(current.tokens.accessToken);
        } catch {
          // Local sign-out proceeds even if revocation fails.
        }
      }
      karpa.reset();
      await persist(null);
      setEndNotice(reason === 'signed-out' ? null : endReasonMessage(reason));
      setStatus('signed-out');
    },
    [persist],
  );

  const checkExpiry = useCallback(async () => {
    const current = sessionRef.current;
    if (!current) return;
    const t = now();
    const reason = sessionExpiry(current, t);
    if (reason) {
      await end(reason);
      return;
    }
    if (needsTokenRefresh(current, t)) {
      try {
        const tokens = await karpa.auth.refresh(current.tokens.refreshToken);
        await persist({ ...current, tokens });
      } catch {
        await end('refresh-failed');
      }
    }
  }, [end, now, persist]);

  // Restore a stored session on launch, discarding it if it has expired.
  useEffect(() => {
    (async () => {
      try {
        const raw = await secureStorage.get(SESSION_KEY);
        const stored = raw ? (JSON.parse(raw) as Session) : null;
        if (stored && !sessionExpiry(stored, now())) {
          sessionRef.current = stored;
          setSession(stored);
          setStatus('signed-in');
          return;
        }
        if (stored) {
          await secureStorage.remove(SESSION_KEY);
          setEndNotice(endReasonMessage('idle'));
        }
      } catch {
        await secureStorage.remove(SESSION_KEY).catch(() => undefined);
      }
      setStatus('signed-out');
    })();
  }, [now]);

  // Periodic and on-foreground expiry checks.
  useEffect(() => {
    const interval = setInterval(() => void checkExpiry(), CHECK_INTERVAL_MS);
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') void checkExpiry();
    });
    return () => {
      clearInterval(interval);
      sub.remove();
    };
  }, [checkExpiry]);

  const touch = useCallback(() => {
    const current = sessionRef.current;
    if (!current) return;
    const t = now();
    const next = touchSession(current, t);
    sessionRef.current = next;
    if (t - lastPersist.current > PERSIST_THROTTLE_MS) {
      lastPersist.current = t;
      void secureStorage.set(SESSION_KEY, JSON.stringify(next));
    }
  }, [now]);

  const begin = useCallback(
    async (user: AuthUser, tokens: Session['tokens']) => {
      if (!APP_ALLOWED_ROLES.includes(user.role)) {
        throw new IntegrationError('This app is for patients only.', 'not-authorized');
      }
      setEndNotice(null);
      await persist(createSession(user, tokens, now()));
      setStatus('signed-in');
    },
    [now, persist],
  );

  const value = useMemo<SessionContextValue>(
    () => ({
      status,
      user: session?.user ?? null,
      endNotice,
      clearEndNotice: () => setEndNotice(null),
      touch,
      signIn: async (email, password) => {
        try {
          const result = await karpa.auth.signIn(email.trim(), password);
          recordAudit('auth.sign-in', result.user.id, { outcome: 'success' });
          track('sign_in_succeeded');
          await begin(result.user, result.tokens);
        } catch (e) {
          recordAudit('auth.sign-in-failed', null, { outcome: 'failure' });
          throw e;
        }
      },
      signUp: async (input) => {
        const result = await karpa.auth.signUp({ ...input, email: input.email.trim() });
        recordAudit('auth.sign-up', result.user.id, { outcome: 'success' });
        track('sign_up_succeeded');
        await begin(result.user, result.tokens);
      },
      signOut: (reason = 'signed-out') => end(reason),
      requestPasswordReset: async (email) => {
        await karpa.auth.requestPasswordReset(email.trim());
        recordAudit('auth.password-reset-requested', null);
      },
    }),
    [begin, end, endNotice, session, status, touch],
  );

  return (
    <SessionContext.Provider value={value}>
      {/* Capture-phase touch listener: records activity without stealing touches. */}
      <View
        style={{ flex: 1 }}
        onStartShouldSetResponderCapture={() => {
          touch();
          return false;
        }}>
        {children}
      </View>
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
