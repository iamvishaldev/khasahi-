import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {useAppTheme} from '@/theme/useAppTheme';
import {OnboardingStepLayout} from '../../components/OnboardingStepLayout';
import {OnboardingPaginationDots} from '../../components/OnboardingPaginationDots';

type WelcomeStepProps = {
  onNext: () => void;
};

export function WelcomeStep({onNext}: WelcomeStepProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <OnboardingStepLayout
      header={
        <View style={[styles.logoRow, {gap: theme.spacing.sm}]}>
          <View
            style={[
              styles.logoBadge,
              {
                backgroundColor: theme.colors.brand.ink,
                borderRadius: theme.radii.sm,
              },
            ]}>
            <AppText
              variant="heading"
              style={{color: theme.colors.accent.primary}}>
              K
            </AppText>
          </View>
          <View>
            <AppText variant="heading">
              khasahi
              <AppText
                variant="heading"
                style={{color: theme.colors.accent.primary}}>
                .ai
              </AppText>
            </AppText>
            <AppText
              variant="caption"
              color="secondary"
              style={styles.logoCaption}>
              FOOD INTELLIGENCE
            </AppText>
          </View>
        </View>
      }
      footer={
        <View style={{gap: theme.spacing.md}}>
          <PrimaryButton label="Get Started" onPress={onNext} />
          <OnboardingPaginationDots total={3} current={0} />
        </View>
      }>
      <View style={[styles.centerBlock, {gap: theme.spacing.lg}]}>
        <View style={styles.illustrationWrap}>
          <View
            style={[
              styles.illustration,
              {
                backgroundColor: theme.colors.surface.primary,
                borderRadius: theme.radii.lg,
                padding: theme.spacing.lg,
                ...theme.shadows.card,
              },
            ]}>
            <AppText
              variant="label"
              style={{color: theme.colors.accent.primary}}>
              🧾 Nutrition Facts
            </AppText>
            <View style={styles.barcodeBlock}>
              <AppText variant="title" style={styles.barcode}>
                ||||‖|||‖||||||‖|
              </AppText>
              <AppText variant="caption" color="secondary">
                0 801234 567892
              </AppText>
            </View>
          </View>
          <View
            style={[
              styles.badge,
              styles.badgeDanger,
              {
                backgroundColor: theme.colors.brand.ink,
                borderRadius: theme.radii.sm,
                padding: theme.spacing.xs,
              },
            ]}>
            <AppText variant="caption" color="inverse">
              ⚠ Sodium High – 840mg
            </AppText>
          </View>
          <View
            style={[
              styles.badge,
              styles.badgeSuccess,
              {
                backgroundColor: theme.colors.accent.primary,
                borderRadius: theme.radii.sm,
                padding: theme.spacing.xs,
              },
            ]}>
            <AppText variant="caption" color="inverse">
              ✓ Score 7.4/10 Good
            </AppText>
          </View>
          <View
            style={[
              styles.dot,
              styles.dotTeal,
              {backgroundColor: theme.colors.accent.secondary},
            ]}
          />
          <View
            style={[
              styles.dot,
              styles.dotAmber,
              {backgroundColor: theme.colors.brand.amber},
            ]}
          />
        </View>

        <AppText variant="display" style={styles.headline}>
          Understand Every Ingredient Before You Buy.
        </AppText>
        <AppText variant="body" color="secondary">
          AI-powered food intelligence. Scan any label, decode every
          ingredient, get a personalized health score.
        </AppText>
      </View>
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCaption: {
    letterSpacing: 1,
  },
  centerBlock: {
    width: '100%',
    marginTop: 8,
  },
  illustrationWrap: {
    width: '100%',
    marginBottom: 4,
  },
  illustration: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 12,
    minHeight: 168,
  },
  headline: {
    fontSize: 28,
    lineHeight: 34,
  },
  barcodeBlock: {
    gap: 4,
  },
  barcode: {
    letterSpacing: 1,
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotTeal: {
    top: -22,
    right: 8,
  },
  dotAmber: {
    top: '55%',
    left: -14,
  },
  badge: {
    position: 'absolute',
  },
  badgeDanger: {
    top: -14,
    right: -6,
  },
  badgeSuccess: {
    bottom: -14,
    left: -6,
  },
});
