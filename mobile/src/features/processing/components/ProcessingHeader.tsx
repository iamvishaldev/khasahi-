import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

export function ProcessingHeader(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={styles.wrap}>
      <AppText variant="wordmark">
        khasahi
        <AppText variant="wordmark" style={{color: theme.colors.accent.primary}}>
          .ai
        </AppText>
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
});
