import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type SelectableChipProps = {
  icon?: string;
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function SelectableChip({
  icon,
  label,
  selected,
  onPress,
}: SelectableChipProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{selected}}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected
            ? theme.colors.accent.primary
            : theme.colors.surface.primary,
          borderColor: selected
            ? theme.colors.accent.primary
            : theme.colors.border.subtle,
          borderRadius: theme.radii.pill,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
        },
      ]}>
      <AppText variant="label" color={selected ? 'inverse' : 'primary'}>
        {icon ? `${icon} ${label}` : label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
});
