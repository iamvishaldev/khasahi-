import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type SelectableCardProps = {
  icon?: string;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
};

export function SelectableCard({
  icon,
  title,
  subtitle,
  selected,
  onPress,
}: SelectableCardProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{selected}}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: selected
            ? theme.colors.surface.subtle
            : theme.colors.surface.primary,
          borderColor: selected
            ? theme.colors.accent.primary
            : theme.colors.border.subtle,
          borderRadius: theme.radii.md,
          padding: theme.spacing.lg,
          gap: theme.spacing.md,
        },
      ]}>
      {icon ? (
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: theme.colors.surface.subtle,
              borderRadius: theme.radii.sm,
            },
          ]}>
          <AppText variant="heading">{icon}</AppText>
        </View>
      ) : null}
      <View style={styles.textWrap}>
        <AppText variant="heading">{title}</AppText>
        <AppText variant="caption" color="secondary">
          {subtitle}
        </AppText>
      </View>
      <View
        style={[
          styles.radioOuter,
          {
            borderColor: selected
              ? theme.colors.accent.primary
              : theme.colors.border.subtle,
          },
        ]}>
        {selected ? (
          <View
            style={[
              styles.radioInner,
              {backgroundColor: theme.colors.accent.primary},
            ]}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
  },
  iconWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
