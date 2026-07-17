import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

export function ScanIllustration(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface.primary,
            borderRadius: theme.radii.lg,
            padding: theme.spacing.lg,
            ...theme.shadows.card,
          },
        ]}>
        <View
          style={[
            styles.aiPill,
            {
              backgroundColor: theme.colors.brand.ink,
              borderRadius: theme.radii.pill,
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.md,
            },
          ]}>
          <AppText variant="label" color="inverse">
            ✨ AI Scanning
          </AppText>
        </View>

        <View
          style={[
            styles.labelCard,
            {
              backgroundColor: theme.colors.surface.subtle,
              borderRadius: theme.radii.md,
              padding: theme.spacing.md,
              marginTop: theme.spacing.md,
              gap: theme.spacing.xs,
            },
          ]}>
          <View
            style={[
              styles.scanLine,
              {backgroundColor: theme.colors.accent.secondary},
            ]}
          />
          <AppText variant="title" style={styles.barcode}>
            ‖|||‖||||‖|||||‖|
          </AppText>
          <AppText variant="caption" color="secondary">
            Sugar · Palm Oil · Sodium Nitrite…
          </AppText>
        </View>

        <View
          style={[
            styles.scoreBadge,
            {
              backgroundColor: theme.colors.accent.primary,
              borderRadius: theme.radii.pill,
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.md,
              marginTop: theme.spacing.md,
            },
          ]}>
          <AppText variant="caption" color="inverse">
            ✓ Score 8.2/10
          </AppText>
        </View>
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
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '86%',
  },
  aiPill: {
    alignSelf: 'flex-start',
  },
  labelCard: {
    width: '100%',
  },
  scanLine: {
    position: 'absolute',
    top: '38%',
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.5,
    borderRadius: 1,
  },
  barcode: {
    letterSpacing: 1,
  },
  scoreBadge: {
    alignSelf: 'flex-end',
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotTeal: {
    top: 12,
    right: '10%',
  },
  dotAmber: {
    bottom: '30%',
    left: '6%',
  },
});
