import React, {useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {ScreenContainer} from '@/components/layout/ScreenContainer';
import {AppText} from '@/components/typography/AppText';
import {supabase} from '@/services/supabase/client';
import {useSessionStore} from '@/store/session.store';
import {useAppTheme} from '@/theme/useAppTheme';

export function ProfileScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const email = useSessionStore(state => state.session?.user.email);
  const clearSession = useSessionStore(state => state.clearSession);
  const setPasswordRecovery = useSessionStore(state => state.setPasswordRecovery);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignOut() {
    setError(null);
    setIsSigningOut(true);

    try {
      if (supabase) {
        const {error: signOutError} = await supabase.auth.signOut();
        if (signOutError) {
          throw signOutError;
        }
      }
      clearSession();
      setPasswordRecovery(false);
    } catch (signOutError) {
      setError(signOutError instanceof Error ? signOutError.message : 'Unable to sign out.');
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <ScreenContainer scrollable>
      <View style={{gap: theme.spacing.sm}}>
        <AppText variant="display">Profile</AppText>
        <AppText variant="body" color="secondary">
          Manage your account and personalized food intelligence settings.
        </AppText>
      </View>

      <View
        style={[
          styles.accountCard,
          {
            backgroundColor: theme.colors.surface.primary,
            borderColor: theme.colors.border.subtle,
            borderRadius: theme.radii.md,
            padding: theme.spacing.lg,
            gap: theme.spacing.xs,
          },
        ]}>
        <AppText variant="label">Signed in as</AppText>
        <AppText variant="body" color="secondary">
          {email || 'Your Khasahi AI account'}
        </AppText>
      </View>

      {error ? (
        <AppText variant="caption" style={{color: theme.colors.feedback.danger}}>
          {error}
        </AppText>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sign out"
        accessibilityState={{disabled: isSigningOut}}
        disabled={isSigningOut}
        onPress={handleSignOut}
        style={({pressed}) => [
          styles.signOutButton,
          {
            borderColor: theme.colors.feedback.danger,
            borderRadius: theme.radii.pill,
            paddingVertical: theme.spacing.md,
            opacity: isSigningOut ? 0.65 : pressed ? 0.8 : 1,
          },
        ]}>
        {isSigningOut ? (
          <ActivityIndicator color={theme.colors.feedback.danger} />
        ) : (
          <AppText variant="button" style={{color: theme.colors.feedback.danger}}>
            Sign out
          </AppText>
        )}
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  accountCard: {
    borderWidth: 1,
  },
  signOutButton: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    width: '100%',
  },
});
