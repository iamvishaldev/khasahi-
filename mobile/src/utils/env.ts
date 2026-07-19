import {
  APP_ENV as RAW_APP_ENV,
  API_BASE_URL as RAW_API_BASE_URL,
  SUPABASE_URL as RAW_SUPABASE_URL,
  SUPABASE_ANON_KEY as RAW_SUPABASE_ANON_KEY,
  OPENAI_API_KEY as RAW_OPENAI_API_KEY,
} from '@env';

type MobileEnv = {
  APP_ENV: string;
  API_BASE_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  OPENAI_API_KEY: string;
};

const RAW: MobileEnv = {
  APP_ENV: RAW_APP_ENV,
  API_BASE_URL: RAW_API_BASE_URL,
  SUPABASE_URL: RAW_SUPABASE_URL,
  SUPABASE_ANON_KEY: RAW_SUPABASE_ANON_KEY,
  OPENAI_API_KEY: RAW_OPENAI_API_KEY,
};

function getEnv(name: keyof MobileEnv): string {
  const value = RAW[name];

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
  OPENAI_API_KEY: getEnv('OPENAI_API_KEY'),
};
