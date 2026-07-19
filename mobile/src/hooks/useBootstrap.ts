import {useEffect} from 'react';
import {Linking} from 'react-native';
import {useSessionStore} from '@/store/session.store';
import {supabase} from '@/services/supabase/client';
import {completeGoogleSignIn} from '@/services/auth/googleAuth';

export function useBootstrap(): void {
  const setSession = useSessionStore(state => state.setSession);
  const setSessionLoaded = useSessionStore(state => state.setSessionLoaded);
  const setPasswordRecovery = useSessionStore(state => state.setPasswordRecovery);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    supabase.auth.getSession().then(({data}) => {
      if (!data.session) {
        setSessionLoaded();
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
      setSessionLoaded();
    }).catch(() => {
      setSessionLoaded();
    });

    const handleOAuthCallback = (url: string) => {
      completeGoogleSignIn(url)
        .then(result => setPasswordRecovery(result === 'recovery'))
        .catch(error => console.warn('Unable to complete authentication callback', error));
    };

    Linking.getInitialURL().then(url => {
      if (url) {
        handleOAuthCallback(url);
      }
    });
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      handleOAuthCallback(url);
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
      linkingSubscription.remove();
    };
  }, [setPasswordRecovery, setSession, setSessionLoaded]);
}
