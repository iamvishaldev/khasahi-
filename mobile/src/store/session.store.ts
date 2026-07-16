import {create} from 'zustand';
import {SessionState} from '@shared/index';

type SessionStore = {
  session: SessionState | null;
  isAuthenticated: boolean;
  setSession: (session: SessionState | null) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionStore>(set => ({
  session: null,
  isAuthenticated: false,
  setSession: session =>
    set({
      session,
      isAuthenticated: Boolean(session?.accessToken),
    }),
  clearSession: () =>
    set({
      session: null,
      isAuthenticated: false,
    }),
}));

