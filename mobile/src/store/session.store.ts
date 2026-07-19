import {create} from 'zustand';
import {SessionState} from '@shared/index';

type SessionStore = {
  session: SessionState | null;
  isAuthenticated: boolean;
  isSessionLoaded: boolean;
  isPasswordRecovery: boolean;
  /** Set when the user explicitly signs out, so DEMO_MODE's auth bypass
   * (see RootNavigator) doesn't force them straight back into the app. */
  demoSignedOut: boolean;
  setSession: (session: SessionState | null) => void;
  setSessionLoaded: () => void;
  setPasswordRecovery: (value: boolean) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionStore>(set => ({
  session: null,
  isAuthenticated: false,
  isSessionLoaded: false,
  isPasswordRecovery: false,
  demoSignedOut: false,
  setSession: session =>
    set(state => ({
      session,
      isAuthenticated: Boolean(session?.accessToken),
      demoSignedOut: session ? false : state.demoSignedOut,
    })),
  setSessionLoaded: () => set({isSessionLoaded: true}),
  setPasswordRecovery: value => set({isPasswordRecovery: value}),
  clearSession: () =>
    set({
      session: null,
      isAuthenticated: false,
      demoSignedOut: true,
    }),
}));
