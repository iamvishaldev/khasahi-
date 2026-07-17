import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {InfoCard} from '@/components/feedback/InfoCard';
import {useAppTheme} from '@/theme/useAppTheme';

type FeatureListItemProps = {
  icon: string;
  title: string;
  description: string;
};

export function FeatureListItem({
  icon,
  title,
  description,
}: FeatureListItemProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <InfoCard>
      <View style={[styles.row, {gap: theme.spacing.md}]}>
        <AppText variant="heading">{icon}</AppText>
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
  textWrap: {
    flex: 1,
    gap: 2,
  },
});
