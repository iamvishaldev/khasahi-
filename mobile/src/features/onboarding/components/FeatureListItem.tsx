import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {InfoCard} from '@/components/feedback/InfoCard';
import {useAppTheme} from '@/theme/useAppTheme';

type FeatureListItemProps = {
  icon: string;
  tint: string;
  title: string;
  description: string;
};

export function FeatureListItem({
  icon,
  tint,
  title,
  description,
}: FeatureListItemProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <InfoCard>
      <View style={[styles.row, {gap: theme.spacing.md}]}>
        <View
          style={[
            styles.iconBadge,
            {backgroundColor: tint, borderRadius: theme.radii.md},
          ]}>
          <AppText variant="heading">{icon}</AppText>
        </View>
        <View style={styles.textWrap}>
          <AppText variant="heading">{title}</AppText>
          <AppText variant="caption" color="secondary">
            {description}
          </AppText>
        </View>
      </View>
    </InfoCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBadge: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
});
