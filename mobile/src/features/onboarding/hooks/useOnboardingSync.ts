import {useEffect, useRef} from 'react';
import {useSessionStore} from '@/store/session.store';
import {useAppStore} from '@/store/app.store';
import {useOnboardingStore} from '@/store/onboarding.store';
import {upsertPreferences} from '@/services/api/profile.api';
import {buildUserPreferences} from '../domain/buildUserPreferences';

export function useOnboardingSync(): void {
  const session = useSessionStore(state => state.session);
  const submissionStatus = useOnboardingStore(
    state => state.submissionStatus,
  );
  const setSubmissionStatus = useOnboardingStore(
    state => state.setSubmissionStatus,
  );
  const setHasCompletedOnboarding = useAppStore(
    state => state.setHasCompletedOnboarding,
  );
  const isSubmitting = useRef(false);

  useEffect(() => {
    if (!session?.accessToken || submissionStatus !== 'pendingAuth') {
      return;
    }
    if (isSubmitting.current) {
      return;
    }

    const draft = useOnboardingStore.getState();
    isSubmitting.current = true;
    setSubmissionStatus('submitting');

    upsertPreferences(buildUserPreferences(draft), session.accessToken)
      .then(() => {
        setSubmissionStatus('submitted');
        setHasCompletedOnboarding(true);
      })
      .catch(() => {
        setSubmissionStatus('error');
      })
      .finally(() => {
        isSubmitting.current = false;
      });
  }, [
    session?.accessToken,
    submissionStatus,
    setSubmissionStatus,
    setHasCompletedOnboarding,
  ]);
}
