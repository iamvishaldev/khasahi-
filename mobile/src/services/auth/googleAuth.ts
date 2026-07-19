import {Linking} from 'react-native';
import {supabase} from '@/services/supabase/client';

export const GOOGLE_AUTH_REDIRECT_URL = 'khasahi://auth/callback';

function getCallbackParams(url: string): URLSearchParams {
  const parsed = new URL(url);
  const fragment = parsed.hash.startsWith('#') ? parsed.hash.slice(1) : parsed.hash;
  return new URLSearchParams(fragment || parsed.search);
}

/** Opens Supabase's Google OAuth page and returns to the app via the custom URL scheme. */
export async function signInWithGoogle(): Promise<void> {
  if (!supabase) {
    throw new Error('Google sign in is unavailable right now. Please try again later.');
  }

  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {redirectTo: GOOGLE_AUTH_REDIRECT_URL, skipBrowserRedirect: true},
  });

  if (error) {
    throw error;
  }
  if (!data.url) {
    throw new Error('Google sign in could not be started. Please try again.');
  }
  if (!(await Linking.canOpenURL(data.url))) {
    throw new Error('No browser is available to complete Google sign in.');
  }

  await Linking.openURL(data.url);
}

/** Exchanges the access and refresh tokens returned by Supabase after Google login. */
export async function completeGoogleSignIn(url: string): Promise<'recovery' | null> {
  if (!supabase || !url.startsWith(GOOGLE_AUTH_REDIRECT_URL)) {
    return null;
  }

  const params = getCallbackParams(url);
  const errorDescription = params.get('error_description') ?? params.get('error');
  if (errorDescription) {
    throw new Error(errorDescription.replace(/\+/g, ' '));
  }

  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  if (!accessToken || !refreshToken) {
    throw new Error('Google sign in did not return a valid session.');
  }

  const {error} = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  if (error) {
    throw error;
  }

  return params.get('type') === 'recovery' ? 'recovery' : null;
}
