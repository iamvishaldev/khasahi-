import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {AppText} from '@/components/typography/AppText';
import {InfoCard} from '@/components/feedback/InfoCard';
import {useAppTheme} from '@/theme/useAppTheme';
import {useOnboardingStore} from '@/store/onboarding.store';
import {findLifestyleProfile} from '@/features/profile/data/lifestyleProfiles';
import {OnboardingStepLayout} from '../../components/OnboardingStepLayout';
import {PillBadge} from '../../components/PillBadge';
import {SummaryRow} from '../../components/SummaryRow';

type ProfileReadyStepProps = {
  onComplete: () => void;
  submitting: boolean;
};

export function ProfileReadyStep({
  onComplete,
  submitting,
}: ProfileReadyStepProps): React.JSX.Element {
  const theme = useAppTheme();
  const lifestyleProfileId = useOnboardingStore(
    state => state.lifestyleProfileId,
  );
  const healthGoals = useOnboardingStore(state => state.healthGoals);
  const dietaryPreference = useOnboardingStore(
    state => state.dietaryPreference,
  );
  const allergies = useOnboardingStore(state => state.allergies);

  const profile = lifestyleProfileId
    ? findLifestyleProfile(lifestyleProfileId)
    : undefined;

  return (
    <OnboardingStepLayout
      footer={
        <PrimaryButton
          label={submitting ? 'Setting up…' : 'Start Scanning'}
          disabled={submitting}
          onPress={onComplete}
        />
      }>
      <View
        style={[
          styles.badgeCircle,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderRadius: theme.radii.pill,
          },
        ]}>
        <AppText variant="title">K</AppText>
      </View>
      <PillBadge label="PROFILE READY" />
      <AppText variant="title">Your AI Profile is Live.</AppText>
      <AppText variant="body" color="secondary">
        Khasahi AI is calibrated to your goals. Every scan now delivers
        personalized intelligence — not generic nutrition data.
      </AppText>
      <InfoCard>
        <View style={{gap: theme.spacing.md}}>
          <AppText variant="caption" color="secondary">
            YOUR PROFILE
          </AppText>
          <SummaryRow label="Lifestyle" value={profile?.label ?? '—'} />
          <SummaryRow
            label="Goals"
            value={healthGoals[0] ?? 'None selected'}
          />
          <SummaryRow label="Diet" value={dietaryPreference ?? 'None'} />
          <SummaryRow
            label="Allergies"
            value={allergies.length > 0 ? allergies.join(', ') : 'None added'}
          />
        </View>
      </InfoCard>
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  badgeCircle: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
