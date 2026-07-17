import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {ScreenContainer} from '@/components/layout/ScreenContainer';
import {useAppTheme} from '@/theme/useAppTheme';
import {supabase} from '@/services/supabase/client';
import {GoogleButton} from '../components/GoogleButton';
import {ScanIllustration} from '../components/ScanIllustration';
import {AuthStackParamList} from '@/types/navigation';

type WelcomeAuthNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AuthWelcome'
>;

export function WelcomeAuthScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<WelcomeAuthNavigationProp>();

  async function handleGoogleSignIn() {
    if (!supabase) {
      return;
    }
    await supabase.auth.signInWithOAuth({provider: 'google'});
  }

  return (
    <ScreenContainer scrollable>
      <View style={[styles.logoBlock, {gap: theme.spacing.sm}]}>
        <View
          style={[
            styles.logoBadge,
            {
              backgroundColor: theme.colors.brand.ink,
              borderRadius: theme.radii.md,
            },
          ]}>
          <AppText variant="title" style={{color: theme.colors.accent.primary}}>
            K
          </AppText>
        </View>
        <View style={styles.wordmarkRow}>
          <AppText variant="wordmark" style={styles.wordmark}>
            khasahi
            <AppText
              variant="wordmark"
              style={[styles.wordmark, {color: theme.colors.accent.primary}]}>
              .ai
            </AppText>
          </AppText>
          <AppText variant="caption" color="secondary" style={styles.caption}>
            FOOD INTELLIGENCE
          </AppText>
        </View>
      </View>

      <ScanIllustration />

      <View style={{gap: theme.spacing.sm}}>
        <AppText variant="display" style={styles.headline}>
          Welcome to Khasahi AI
        </AppText>
        <AppText variant="body" color="secondary" style={styles.subtitle}>
          Understand every ingredient before you buy.
        </AppText>
      </View>

      <View style={[styles.ctaGroup, {gap: theme.spacing.md}]}>
        <GoogleButton variant="primary" onPress={handleGoogleSignIn} />
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('SignIn')}
          style={styles.emailButton}>
          <AppText variant="button" style={{color: theme.colors.text.primary}}>
            Continue with Email
          </AppText>
        </Pressable>
      </View>

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
          🔒 Your health data is encrypted and private.
        </AppText>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  logoBlock: {
    alignItems: 'center',
    marginTop: 8,
  },
  logoBadge: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmarkRow: {
    alignItems: 'center',
  },
  wordmark: {
    fontSize: 24,
  },
  caption: {
    letterSpacing: 1,
  },
  headline: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  ctaGroup: {
    width: '100%',
  },
  emailButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  trustBanner: {
    alignItems: 'center',
  },
  trustText: {
    textAlign: 'center',
  },
});
