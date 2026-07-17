import React, {PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';

type OnboardingStepLayoutProps = PropsWithChildren<{
  header?: React.ReactNode;
  footer?: React.ReactNode;
}>;

export function OnboardingStepLayout({
  header,
  footer,
  children,
}: OnboardingStepLayoutProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      {header ? (
        <View
          style={{
            paddingHorizontal: theme.spacing.xl,
            paddingTop: theme.spacing.md,
          }}>
          {header}
        </View>
      ) : null}
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {padding: theme.spacing.xl, gap: theme.spacing.lg},
        ]}>
        {children}
      </ScrollView>
      {footer ? (
        <View
          style={{
            paddingHorizontal: theme.spacing.xl,
            paddingBottom: theme.spacing.lg,
          }}>
          {footer}
        </View>
      ) : null}
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
