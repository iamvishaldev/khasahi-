export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  AuthWelcome: undefined;
  SignIn: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Scanner: {mode?: 'barcode' | 'ocr'} | undefined;
  Processing: {photoUri: string};
  Analysis: {scanId?: string} | undefined;
  Chat: {scanId?: string} | undefined;
  History: undefined;
  Profile: undefined;
};

