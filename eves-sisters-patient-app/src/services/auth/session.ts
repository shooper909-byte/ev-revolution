import type { AuthTokens, AuthUser } from '@/integrations/karpa/types';

/**
 * Session policy. Pure functions so they can be unit tested without a device.
 *
 * - Idle timeout: the session ends after a period with no user activity.
 * - Absolute timeout: the session ends after a fixed lifetime regardless of
 *   activity, forcing re-authentication.
 * - Background lock: returning from the background after the idle window
 *   ends the session.
 *
 * Values are placeholders pending security review; healthcare apps commonly
 * use 10–15 minutes idle. See docs/SECURITY_COMPLIANCE_CHECKLIST.md.
 */
export const sessionPolicy = {
  idleTimeoutMs: 15 * 60_000,
  absoluteTimeoutMs: 12 * 60 * 60_000,
  /** Refresh the access token when it has less than this much life left. */
  refreshWindowMs: 2 * 60_000,
} as const;

export type Session = {
  user: AuthUser;
  tokens: AuthTokens;
  createdAt: number;
  lastActiveAt: number;
};

export type SessionEndReason = 'idle' | 'absolute' | 'signed-out' | 'refresh-failed';

export function createSession(user: AuthUser, tokens: AuthTokens, nowMs: number): Session {
  return { user, tokens, createdAt: nowMs, lastActiveAt: nowMs };
}

export function touchSession(session: Session, nowMs: number): Session {
  return { ...session, lastActiveAt: nowMs };
}

export function sessionExpiry(
  session: Session,
  nowMs: number,
  policy: { idleTimeoutMs: number; absoluteTimeoutMs: number } = sessionPolicy,
): SessionEndReason | null {
  if (nowMs - session.createdAt >= policy.absoluteTimeoutMs) return 'absolute';
  if (nowMs - session.lastActiveAt >= policy.idleTimeoutMs) return 'idle';
  return null;
}

export function needsTokenRefresh(session: Session, nowMs: number, windowMs = sessionPolicy.refreshWindowMs): boolean {
  return new Date(session.tokens.expiresAt).getTime() - nowMs <= windowMs;
}

export function endReasonMessage(reason: SessionEndReason): string {
  switch (reason) {
    case 'idle':
      return 'For your privacy, you were signed out after a period of inactivity.';
    case 'absolute':
      return 'For your security, please sign in again.';
    case 'refresh-failed':
      return 'Your session has ended. Please sign in again.';
    case 'signed-out':
      return 'You have been signed out.';
  }
}
