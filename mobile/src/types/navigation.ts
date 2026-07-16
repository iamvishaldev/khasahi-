export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Scanner: {mode?: 'barcode' | 'ocr'} | undefined;
  Analysis: {scanId?: string} | undefined;
  Chat: {scanId?: string} | undefined;
  History: undefined;
  Profile: undefined;
};

