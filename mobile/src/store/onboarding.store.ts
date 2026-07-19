import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {LifestyleFieldAnswer, LifestyleProfileId} from '@shared/index';
import {persistStorage} from './persist/asyncStorage';

export type OnboardingSubmissionStatus =
  | 'idle'
  | 'pendingAuth'
  | 'submitting'
  | 'submitted'
  | 'error';

type OnboardingDraft = {
  lifestyleProfileId: LifestyleProfileId | null;
  lifestyleAnswers: LifestyleFieldAnswer[];
  healthGoals: string[];
  dietaryPreference: string | null;
  allergies: string[];
  age: number | undefined;
  submissionStatus: OnboardingSubmissionStatus;
};

type OnboardingStore = OnboardingDraft & {
  setLifestyleProfile: (id: LifestyleProfileId) => void;
  setLifestyleAnswer: (
    fieldId: string,
    value: LifestyleFieldAnswer['value'],
  ) => void;
  toggleHealthGoal: (label: string) => void;
  setDietaryPreference: (label: string | null) => void;
  setAllergies: (allergies: string[]) => void;
  setAge: (age: number | undefined) => void;
  setSubmissionStatus: (status: OnboardingSubmissionStatus) => void;
  reset: () => void;
};

const initialDraft: OnboardingDraft = {
  lifestyleProfileId: null,
  lifestyleAnswers: [],
  healthGoals: [],
  dietaryPreference: null,
  allergies: [],
  age: undefined,
  submissionStatus: 'idle',
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      ...initialDraft,
      setLifestyleProfile: id =>
        set({
          lifestyleProfileId: id,
          lifestyleAnswers: [],
        }),
      setLifestyleAnswer: (fieldId, value) => {
        const existing = get().lifestyleAnswers.filter(
          answer => answer.fieldId !== fieldId,
        );
        set({lifestyleAnswers: [...existing, {fieldId, value}]});
      },
      toggleHealthGoal: label => {
        const {healthGoals} = get();
        set({
          healthGoals: healthGoals.includes(label)
            ? healthGoals.filter(goal => goal !== label)
            : [...healthGoals, label],
        });
      },
      setDietaryPreference: label => set({dietaryPreference: label}),
      setAllergies: allergies => set({allergies}),
      setAge: age => set({age}),
      setSubmissionStatus: status => set({submissionStatus: status}),
      reset: () => set({...initialDraft}),
    }),
    {
      name: 'khasahi-onboarding-draft',
      storage: createJSONStorage(() => persistStorage),
    },
  ),
);
