import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {ScreenContainer} from '@/components/layout/ScreenContainer';
import {TextField} from '@/components/inputs/TextField';
import {useAppTheme} from '@/theme/useAppTheme';
import {supabase} from '@/services/supabase/client';
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '@/services/forms/resolvers';
import {AuthStackParamList} from '@/types/navigation';

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

export function ForgotPasswordScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {email: ''},
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    if (!supabase) {
      setAuthError('Password reset is unavailable right now. Please try again later.');
      return;
    }

    setAuthError(null);
    setIsSubmitting(true);
    const {error} = await supabase.auth.resetPasswordForEmail(values.email);
    setIsSubmitting(false);

    if (error) {
      setAuthError(error.message);
      return;
    }

    setSubmittedEmail(values.email);
  }

  if (submittedEmail) {
    return (
      <ScreenContainer>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => navigation.navigate('SignIn')}
          style={[
            styles.backButton,
            {
              backgroundColor: theme.colors.surface.subtle,
              borderRadius: theme.radii.sm,
            },
          ]}>
          <AppText variant="heading">←</AppText>
        </Pressable>

        <View style={styles.successBlock}>
          <View
            style={[
              styles.successBadge,
              {
                backgroundColor: theme.colors.surface.subtle,
                borderRadius: theme.radii.pill,
              },
            ]}>
            <AppText variant="title">📬</AppText>
          </View>
          <AppText variant="display" style={styles.centerText}>
            Check your email
          </AppText>
          <AppText variant="body" color="secondary" style={styles.centerText}>
            We've sent a password reset link to {submittedEmail}.
          </AppText>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('SignIn')}
          style={styles.backToSignIn}>
          <AppText variant="label" style={{color: theme.colors.accent.primary}}>
            Back to Sign In
          </AppText>
        </Pressable>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back"
        onPress={() => navigation.goBack()}
        style={[
          styles.backButton,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderRadius: theme.radii.sm,
          },
        ]}>
        <AppText variant="heading">←</AppText>
      </Pressable>

      <View style={{gap: theme.spacing.sm}}>
        <AppText variant="display">Reset your password</AppText>
        <AppText variant="body" color="secondary">
          Enter the email linked to your account and we'll send you a reset
          link.
        </AppText>
      </View>

      <Controller
        control={control}
        name="email"
        render={({field: {value, onChange, onBlur}}) => (
          <TextField
            label="Email"
            icon="📧"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            error={errors.email?.message}
          />
        )}
      />

      {authError ? (
        <View
          style={[
            styles.errorBanner,
            {
              backgroundColor: theme.colors.surface.primary,
              borderRadius: theme.radii.sm,
              padding: theme.spacing.md,
              borderColor: theme.colors.feedback.danger,
            },
          ]}>
          <AppText variant="caption" style={{color: theme.colors.feedback.danger}}>
            {authError}
          </AppText>
        </View>
      ) : null}

      {isSubmitting ? (
        <View
          style={[
            styles.loadingButton,
            {
              backgroundColor: theme.colors.accent.primary,
              borderRadius: theme.radii.pill,
              paddingVertical: theme.spacing.md,
            },
          ]}>
          <ActivityIndicator color={theme.colors.text.inverse} />
        </View>
      ) : (
        <PrimaryButton label="Reset Password" onPress={handleSubmit(onSubmit)} />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBanner: {
    borderWidth: 1,
    width: '100%',
  },
  loadingButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  successBadge: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  centerText: {
    textAlign: 'center',
  },
  backToSignIn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
