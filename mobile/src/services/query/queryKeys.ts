export const queryKeys = {
  profile: ['profile'] as const,
  scanHistory: ['scan-history'] as const,
  scanResult: (scanId: string) => ['scan-result', scanId] as const,
};

