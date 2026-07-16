import {create} from 'zustand';

type AppStore = {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => void;
};

export const useAppStore = create<AppStore>(set => ({
  hasCompletedOnboarding: false,
  setHasCompletedOnboarding: value =>
    set({
      hasCompletedOnboarding: value,
    }),
}));

