import React, {PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';

type ScreenContainerProps = PropsWithChildren<{
  scrollable?: boolean;
}>;

export function ScreenContainer({
  children,
  scrollable = false,
}: ScreenContainerProps): React.JSX.Element {
  const theme = useAppTheme();

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {padding: theme.spacing.xl, gap: theme.spacing.lg},
      ]}>
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.content,
        {padding: theme.spacing.xl, gap: theme.spacing.lg},
      ]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

