import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {persistStorage} from './persist/asyncStorage';

type AppStore = {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    set => ({
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: value =>
        set({
          hasCompletedOnboarding: value,
        }),
    }),
    {
      name: 'khasahi-app-state',
      storage: createJSONStorage(() => persistStorage),
    },
  ),
);
