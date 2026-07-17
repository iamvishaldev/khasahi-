import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@/types/navigation';
import {useSessionStore} from '@/store/session.store';
import {useAppStore} from '@/store/app.store';
import {useOnboardingStore} from '@/store/onboarding.store';
import {upsertPreferences} from '@/services/api/profile.api';
import {useOnboardingSteps} from '../domain/useOnboardingSteps';
import {buildUserPreferences} from '../domain/buildUserPreferences';
import {WelcomeStep} from './steps/WelcomeStep';
import {AIPersonalizationIntroStep} from './steps/AIPersonalizationIntroStep';
import {LifestyleSelectionStep} from './steps/LifestyleSelectionStep';
import {HealthGoalsStep} from './steps/HealthGoalsStep';
import {DietaryPreferencesStep} from './steps/DietaryPreferencesStep';
import {LifestyleProfileFieldsStep} from './steps/LifestyleProfileFieldsStep';
import {ProfileReadyStep} from './steps/ProfileReadyStep';

type OnboardingNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

export function OnboardingScreen(): React.JSX.Element | null {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const {steps, totalProgressSteps, progressStepFor} = useOnboardingSteps();
  const [currentIndex, setCurrentIndex] = useState(0);

  const session = useSessionStore(state => state.session);
  const setHasCompletedOnboarding = useAppStore(
    state => state.setHasCompletedOnboarding,
  );
  const submissionStatus = useOnboardingStore(
    state => state.submissionStatus,
  );
  const setSubmissionStatus = useOnboardingStore(
    state => state.setSubmissionStatus,
  );

  const currentStepId = steps[currentIndex];

  function goNext() {
    setCurrentIndex(index => Math.min(index + 1, steps.length - 1));
  }

  function goBack() {
    setCurrentIndex(index => Math.max(index - 1, 0));
  }

  async function handleComplete() {
    const draft = useOnboardingStore.getState();

    if (session?.accessToken) {
      setSubmissionStatus('submitting');
      try {
        await upsertPreferences(
          buildUserPreferences(draft),
          session.accessToken,
        );
        setSubmissionStatus('submitted');
        setHasCompletedOnboarding(true);
      } catch {
        setSubmissionStatus('error');
      }
      return;
    }

    setSubmissionStatus('pendingAuth');
    navigation.navigate('SignIn');
  }

  switch (currentStepId) {
    case 'welcome':
      return <WelcomeStep onNext={goNext} />;
    case 'ai-intro':
      return (
        <AIPersonalizationIntroStep
          step={progressStepFor('ai-intro')}
          totalSteps={totalProgressSteps}
          onNext={goNext}
          onBack={goBack}
        />
      );
    case 'lifestyle':
      return (
        <LifestyleSelectionStep
          step={progressStepFor('lifestyle')}
          totalSteps={totalProgressSteps}
          onNext={goNext}
          onBack={goBack}
        />
      );
    case 'goals':
      return (
        <HealthGoalsStep
          step={progressStepFor('goals')}
          totalSteps={totalProgressSteps}
          onNext={goNext}
          onBack={goBack}
        />
      );
    case 'diet':
      return (
        <DietaryPreferencesStep
          step={progressStepFor('diet')}
          totalSteps={totalProgressSteps}
          onNext={goNext}
          onBack={goBack}
        />
      );
    case 'lifestyle-fields':
      return (
        <LifestyleProfileFieldsStep
          step={progressStepFor('lifestyle-fields')}
          totalSteps={totalProgressSteps}
          onNext={goNext}
          onBack={goBack}
        />
      );
    case 'profile-ready':
      return (
        <ProfileReadyStep
          onComplete={handleComplete}
          submitting={submissionStatus === 'submitting'}
        />
      );
    default:
      return null;
  }
}
