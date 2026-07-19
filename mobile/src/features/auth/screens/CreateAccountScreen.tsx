import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {ScreenContainer} from '@/components/layout/ScreenContainer';
import {TextField} from '@/components/inputs/TextField';
import {useAppTheme} from '@/theme/useAppTheme';
import {supabase} from '@/services/supabase/client';
import {signInWithGoogle} from '@/services/auth/googleAuth';
import {
  CreateAccountFormValues,
  createAccountSchema,
} from '@/services/forms/resolvers';
import {GoogleButton} from '../components/GoogleButton';
import {AuthDivider} from '../components/AuthDivider';
import {AuthFooterLink} from '../components/AuthFooterLink';
import {AuthStackParamList} from '@/types/navigation';

type CreateAccountNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CreateAccount'
>;

export function CreateAccountScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<CreateAccountNavigationProp>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {name: '', email: '', password: '', confirmPassword: ''},
  });

  async function onSubmit(values: CreateAccountFormValues) {
    if (!supabase) {
      setAuthError('Account creation is unavailable right now. Please try again later.');
      return;
    }

    setAuthError(null);
    setIsSubmitting(true);
    const {data, error} = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {data: {full_name: values.name}},
    });
    setIsSubmitting(false);

    if (error) {
      setAuthError(error.message);
      return;
    }

    if (!data.session) {
      setConfirmationEmail(values.email);
    }
  }

  async function handleGoogleSignUp() {
    setAuthError(null);
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Google sign up failed.');
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <ScreenContainer scrollable>
      <View style={[styles.logoBlock, {gap: theme.spacing.xs}]}>
        <AppText variant="wordmark">
          🤖 Khasahi
          <AppText variant="wordmark" style={{color: theme.colors.accent.primary}}>
            .ai
          </AppText>
        </AppText>
        <AppText variant="caption" color="secondary" style={styles.logoCaption}>
          FOOD INTELLIGENCE
        </AppText>
      </View>

      <View style={{gap: theme.spacing.sm}}>
        <AppText variant="display">Create Your Account</AppText>
        <AppText variant="body" color="secondary">
          Create an account to save your scans and preferences.
        </AppText>
      </View>

      <View style={{gap: theme.spacing.lg}}>
        <Controller
          control={control}
          name="name"
          render={({field: {value, onChange, onBlur}}) => (
            <TextField
              label="Name"
              icon="👤"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
              textContentType="name"
              error={errors.name?.message}
            />
          )}
        />

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

        <Controller
          control={control}
          name="password"
          render={({field: {value, onChange, onBlur}}) => (
            <TextField
              label="Password"
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
              label="Confirm Password"
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

      {confirmationEmail ? (
        <View
          style={[
            styles.errorBanner,
            {backgroundColor: theme.colors.surface.subtle, borderRadius: theme.radii.sm, padding: theme.spacing.md, borderColor: theme.colors.accent.primary},
          ]}>
          <AppText variant="caption" color="secondary">
            Check {confirmationEmail} to confirm your account, then sign in.
          </AppText>
        </View>
      ) : null}

      <View style={{gap: theme.spacing.lg}}>
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
          <PrimaryButton label="Create Account" onPress={handleSubmit(onSubmit)} />
        )}

        <AuthDivider />

        <GoogleButton
          variant="outline"
          label="Sign up with Google"
          onPress={handleGoogleSignUp}
          isLoading={isGoogleLoading}
        />
      </View>

      <AppText variant="caption" color="secondary" style={styles.terms}>
        By creating an account, you agree to our Terms of Service and Privacy
        Policy.
      </AppText>

      <AuthFooterLink
        question="Already have an account?"
        actionLabel="Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  logoBlock: {
    alignItems: 'center',
    marginTop: 16,
  },
  logoCaption: {
    letterSpacing: 1,
  },
  errorBanner: {
    borderWidth: 1,
    width: '100%',
  },
  loadingButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  terms: {
    textAlign: 'center',
  },
});
