import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {SectionCard} from './SectionCard';
import {AIConfidence, AIVerdict} from '../types/analysis.types';

type AIVerdictCardProps = {
  verdict: AIVerdict;
  confidence: AIConfidence;
};

export function AIVerdictCard({verdict, confidence}: AIVerdictCardProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <SectionCard>
      <AppText variant="heading">AI Verdict</AppText>

      <View style={{gap: theme.spacing.xs}}>
        <AppText variant="title">{verdict.headline}</AppText>
        <AppText variant="body" color="secondary">
          {verdict.body}
        </AppText>
      </View>

      <View style={[styles.divider, {backgroundColor: theme.colors.border.subtle}]} />

      <View style={{gap: theme.spacing.sm}}>
        <View style={[styles.confidenceRow, {gap: theme.spacing.xs}]}>
          <AppText variant="label" color="secondary">
            AI Confidence
          </AppText>
          <AppText variant="heading" style={{color: theme.colors.accent.primary}}>
            {confidence.percent}%
          </AppText>
        </View>

        <AppText variant="caption" color="secondary">
          Based on:
        </AppText>
        <View style={[styles.basedOnWrap, {gap: theme.spacing.xs}]}>
          {confidence.basedOn.map(item => (
            <View
              key={item}
              style={[
                styles.basedOnChip,
                {
                  backgroundColor: theme.colors.surface.subtle,
                  borderRadius: theme.radii.sm,
                  paddingVertical: theme.spacing.xs,
                  paddingHorizontal: theme.spacing.sm,
                },
              ]}>
              <AppText variant="caption" style={{color: theme.colors.accent.primary}}>
                ✓ {item}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  basedOnWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  basedOnChip: {
    alignSelf: 'flex-start',
  },
});
