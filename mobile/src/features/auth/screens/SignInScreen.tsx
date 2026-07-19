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
import {signInWithGoogle} from '@/services/auth/googleAuth';
import {SignInFormValues, signInSchema} from '@/services/forms/resolvers';
import {GoogleButton} from '../components/GoogleButton';
import {AuthDivider} from '../components/AuthDivider';
import {AuthFooterLink} from '../components/AuthFooterLink';
import {AuthStackParamList} from '@/types/navigation';

type SignInNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SignIn'
>;

export function SignInScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<SignInNavigationProp>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {email: '', password: ''},
  });

  async function onSubmit(values: SignInFormValues) {
    if (!supabase) {
      setAuthError('Sign in is unavailable right now. Please try again later.');
      return;
    }

    setAuthError(null);
    setIsSubmitting(true);
    const {error} = await supabase.auth.signInWithPassword(values);
    setIsSubmitting(false);

    if (error) {
      setAuthError(error.message);
    }
  }

  async function handleGoogleSignIn() {
    setAuthError(null);
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Google sign in failed.');
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
        <AppText variant="display">Welcome Back 👋</AppText>
        <AppText variant="body" color="secondary">
          Continue your personalized food intelligence journey.
        </AppText>
      </View>

      <View style={{gap: theme.spacing.lg}}>
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
              textContentType="password"
              error={errors.password?.message}
            />
          )}
        />

        <Pressable
          style={styles.forgotPassword}
          accessibilityRole="button"
          onPress={() => navigation.navigate('ForgotPassword')}>
          <AppText variant="label" style={{color: theme.colors.accent.primary}}>
            Forgot Password?
          </AppText>
        </Pressable>
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
          <PrimaryButton label="Continue" onPress={handleSubmit(onSubmit)} />
        )}

        <AuthDivider />

        <GoogleButton
          variant="outline"
          onPress={handleGoogleSignIn}
          isLoading={isGoogleLoading}
        />
      </View>

      <AuthFooterLink
        question="Don't have an account?"
        actionLabel="Create Account"
        onPress={() => navigation.navigate('CreateAccount')}
      />

      <View
        style={[
          styles.trustBanner,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderRadius: theme.radii.md,
            padding: theme.spacing.lg,
          },
        ]}>
        <AppText variant="caption" color="secondary" style={styles.trustText}>
          🔒 Your data is encrypted. We never share your health data.
        </AppText>
      </View>
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
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  errorBanner: {
    borderWidth: 1,
    width: '100%',
  },
  loadingButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustBanner: {
    alignItems: 'center',
  },
  trustText: {
    textAlign: 'center',
  },
});
