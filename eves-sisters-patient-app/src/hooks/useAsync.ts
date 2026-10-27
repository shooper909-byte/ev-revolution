import { useCallback, useEffect, useRef, useState } from 'react';

import { toUserMessage } from '@/integrations/karpa/errors';

export type AsyncState<T> =
  | { status: 'loading'; data?: T; error?: undefined }
  | { status: 'success'; data: T; error?: undefined }
  | { status: 'error'; data?: T; error: string };

/**
 * Runs an async loader and tracks loading / success / error, so every screen
 * renders the same three states. `reload` re-runs it (pull-to-refresh, retry).
 */
export function useAsync<T>(loader: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });
  const [refreshing, setRefreshing] = useState(false);
  const mounted = useRef(true);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  const run = useCallback(async (mode: 'initial' | 'refresh' = 'initial') => {
    if (mode === 'refresh') setRefreshing(true);
    else setState((s) => ({ status: 'loading', data: s.data }));
    try {
      const data = await loaderRef.current();
      if (mounted.current) setState({ status: 'success', data });
    } catch (e) {
      if (mounted.current) setState((s) => ({ status: 'error', data: s.data, error: toUserMessage(e) }));
    } finally {
      if (mounted.current) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void run();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    ...state,
    refreshing,
    reload: () => run('initial'),
    refresh: () => run('refresh'),
  };
}
