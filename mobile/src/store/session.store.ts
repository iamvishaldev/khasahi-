import {create} from 'zustand';
import {SessionState} from '@shared/index';

type SessionStore = {
  session: SessionState | null;
  isAuthenticated: boolean;
  isSessionLoaded: boolean;
  isPasswordRecovery: boolean;
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
  setSession: session =>
    set({
      session,
      isAuthenticated: Boolean(session?.accessToken),
    }),
  setSessionLoaded: () => set({isSessionLoaded: true}),
  setPasswordRecovery: value => set({isPasswordRecovery: value}),
  clearSession: () =>
    set({
      session: null,
      isAuthenticated: false,
    }),
}));
