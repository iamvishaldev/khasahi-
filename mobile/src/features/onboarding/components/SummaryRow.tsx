import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';

type SummaryRowProps = {
  label: string;
  value: string;
};

export function SummaryRow({label, value}: SummaryRowProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      <AppText variant="caption" color="secondary">
        {label}
      </AppText>
      <AppText variant="label">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
