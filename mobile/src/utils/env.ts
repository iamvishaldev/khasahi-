import Config from 'react-native-config';

type MobileEnv = {
  APP_ENV: string;
  API_BASE_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

function getEnv(name: keyof MobileEnv): string {
  const value = Config[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env: MobileEnv = {
  APP_ENV: getEnv('APP_ENV'),
  API_BASE_URL: getEnv('API_BASE_URL'),
  SUPABASE_URL: getEnv('SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnv('SUPABASE_ANON_KEY'),
};

