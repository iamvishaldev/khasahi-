import {useEffect} from 'react';
import {useSessionStore} from '@/store/session.store';
import {supabase} from '@/services/supabase/client';

export function useBootstrap(): void {
  const setSession = useSessionStore(state => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({data}) => {
      if (!data.session) {
        return;
      }

      setSession({
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        user: {
          id: data.session.user.id,
          email: data.session.user.email ?? '',
        },
      });
    });

    const authSubscription = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        setSession(null);
        return;
      }

      setSession({
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        user: {
          id: session.user.id,
          email: session.user.email ?? '',
        },
      });
    });

    return () => {
      authSubscription.data.subscription.unsubscribe();
    };
  }, [setSession]);
}
