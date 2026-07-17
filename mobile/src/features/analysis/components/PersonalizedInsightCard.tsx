import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {SectionCard} from './SectionCard';
import {AIRecommendation, UserProfile} from '../types/analysis.types';

type PersonalizedInsightCardProps = {
  userProfile: UserProfile;
  recommendation: AIRecommendation;
};

export function PersonalizedInsightCard({
  userProfile,
  recommendation,
}: PersonalizedInsightCardProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <SectionCard>
      <AppText variant="heading">Personalized For You</AppText>

      <View style={{gap: theme.spacing.xs}}>
        <AppText variant="caption" color="secondary">
          Because your profile is:
        </AppText>
        <AppText variant="body">
          {userProfile.lifestyleIcon} {userProfile.lifestyleLabel}
        </AppText>
      </View>

      <View style={{gap: theme.spacing.xs}}>
        <AppText variant="caption" color="secondary">
          Goal:
        </AppText>
        <AppText variant="body">
          {userProfile.goalIcon} {userProfile.goalLabel}
        </AppText>
      </View>

      <View
        style={[
          styles.recommendationBlock,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderRadius: theme.radii.md,
            padding: theme.spacing.md,
            gap: theme.spacing.xs,
          },
        ]}>
        <AppText variant="label" style={{color: theme.colors.accent.primary}}>
          AI Recommendation
        </AppText>
        <AppText variant="body">{recommendation.message}</AppText>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  recommendationBlock: {
    width: '100%',
  },
});
