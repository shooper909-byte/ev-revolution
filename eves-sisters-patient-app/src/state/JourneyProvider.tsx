import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';

import { emptyJourney, journeyReducer, seedJourney, type JourneyAction, type JourneyState } from './journey';
import { useSession } from './SessionProvider';

const JourneyContext = createContext<{ state: JourneyState; dispatch: Dispatch<JourneyAction> } | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [state, dispatch] = useReducer(journeyReducer, emptyJourney);

  // Seed on sign-in, wipe on sign-out: nothing outlives the session.
  useEffect(() => {
    dispatch({ type: 'reset', state: status === 'signed-in' ? seedJourney(new Date()) : emptyJourney });
  }, [status]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used within JourneyProvider');
  return ctx;
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
