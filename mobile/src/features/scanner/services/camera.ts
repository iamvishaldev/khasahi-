export type ScanMode = 'barcode' | 'ocr';

export type CameraPermissionState =
  | 'not-determined'
  | 'granted'
  | 'denied'
  | 'restricted';

export interface ScannerCapability {
  mode: ScanMode;
  requiresLiveProcessing: boolean;
}

export const scannerCapabilities: ScannerCapability[] = [
  {
    mode: 'barcode',
    requiresLiveProcessing: true,
  },
  {
    mode: 'ocr',
    requiresLiveProcessing: false,
  },
];

