import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {z} from 'zod';
import {AppText} from '@/components/typography/AppText';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {ScreenContainer} from '@/components/layout/ScreenContainer';
import {TextField} from '@/components/inputs/TextField';
import {supabase} from '@/services/supabase/client';
import {useSessionStore} from '@/store/session.store';
import {useAppTheme} from '@/theme/useAppTheme';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(values => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const setPasswordRecovery = useSessionStore(state => state.setPasswordRecovery);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {control, handleSubmit, formState: {errors}} = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {password: '', confirmPassword: ''},
  });

  async function handleReset(values: ResetPasswordFormValues) {
    if (!supabase) {
      setError('Password reset is unavailable right now. Please try again later.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    const {error: updateError} = await supabase.auth.updateUser({password: values.password});
    setIsSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }
    setPasswordRecovery(false);
  }

  return (
    <ScreenContainer scrollable>
      <View style={{gap: theme.spacing.sm}}>
        <AppText variant="display">Choose a new password</AppText>
        <AppText variant="body" color="secondary">
          Use a new password to secure your Khasahi AI account.
        </AppText>
      </View>

      <View style={{gap: theme.spacing.lg}}>
        <Controller
          control={control}
          name="password"
          render={({field: {value, onChange, onBlur}}) => (
            <TextField
              label="New password"
              icon="🔒"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              textContentType="newPassword"
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({field: {value, onChange, onBlur}}) => (
            <TextField
              label="Confirm new password"
              icon="🔒"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              textContentType="newPassword"
              error={errors.confirmPassword?.message}
            />
          )}
        />
      </View>

      {error ? <AppText variant="caption" style={{color: theme.colors.feedback.danger}}>{error}</AppText> : null}

      {isSubmitting ? (
        <View style={[styles.loadingButton, {backgroundColor: theme.colors.accent.primary, borderRadius: theme.radii.pill, paddingVertical: theme.spacing.md}]}>
          <ActivityIndicator color={theme.colors.text.inverse} />
        </View>
      ) : (
        <PrimaryButton label="Update Password" onPress={handleSubmit(handleReset)} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loadingButton: {alignItems: 'center', justifyContent: 'center'},
});
