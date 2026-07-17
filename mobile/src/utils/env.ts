type MobileEnv = {
  APP_ENV: string;
  API_BASE_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

function loadNativeConfig(): Partial<MobileEnv> {
  try {
    return require('react-native-config').default ?? {};
  } catch {
    console.warn('react-native-config native module unavailable');
    return {};
  }
}

const Config = loadNativeConfig();

function getEnv(name: keyof MobileEnv): string {
  const value = Config[name];

  if (!value) {
    console.warn(`Missing environment variable: ${name}`);
    return '';
  }

  return value;
}

export const env: MobileEnv = {
  APP_ENV: getEnv('APP_ENV'),
  API_BASE_URL: getEnv('API_BASE_URL'),
  SUPABASE_URL: getEnv('SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnv('SUPABASE_ANON_KEY'),
};
