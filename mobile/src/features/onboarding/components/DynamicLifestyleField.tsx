import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {LifestyleFieldDefinition} from '@shared/index';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {SelectableCard} from './SelectableCard';
import {SelectableChip} from './SelectableChip';

type FieldValue = string | number | string[] | undefined;

type DynamicLifestyleFieldProps = {
  field: LifestyleFieldDefinition;
  value: FieldValue;
  onChange: (value: string | number | string[]) => void;
};

export function DynamicLifestyleField({
  field,
  value,
  onChange,
}: DynamicLifestyleFieldProps): React.JSX.Element {
  const theme = useAppTheme();
  const multiValue = Array.isArray(value) ? value : [];

  return (
    <View style={[styles.field, {gap: theme.spacing.sm}]}>
      <AppText variant="label" color="secondary">
        {field.label.toUpperCase()}
      </AppText>

      {field.inputType === 'single-select' &&
        (field.options ?? []).map(option => (
          <SelectableCard
            key={option.id}
            icon="•"
            title={option.label}
            subtitle=""
            selected={value === option.id}
            onPress={() => onChange(option.id)}
          />
        ))}

      {field.inputType === 'multi-select' && (
        <View style={[styles.chipGrid, {gap: theme.spacing.sm}]}>
          {(field.options ?? []).map(option => (
            <SelectableChip
              key={option.id}
              label={option.label}
              selected={multiValue.includes(option.id)}
              onPress={() =>
                onChange(
                  multiValue.includes(option.id)
                    ? multiValue.filter(id => id !== option.id)
                    : [...multiValue, option.id],
                )
              }
            />
          ))}
        </View>
      )}

      {(field.inputType === 'text' || field.inputType === 'number') && (
        <TextInput
          value={typeof value === 'string' || typeof value === 'number' ? String(value) : ''}
          onChangeText={text =>
            onChange(field.inputType === 'number' ? Number(text) : text)
          }
          keyboardType={field.inputType === 'number' ? 'numeric' : 'default'}
          style={[
            styles.input,
            {
              borderColor: theme.colors.border.subtle,
              borderRadius: theme.radii.sm,
              padding: theme.spacing.md,
              color: theme.colors.text.primary,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    borderWidth: 1,
  },
});
