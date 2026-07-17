export type ScanStatus = 'idle' | 'searching' | 'detected' | 'capturing';

export type ScanStatusCopy = {
  label: string;
  description: string;
};

/**
 * Future-ready mode flag: today only label/nutrition scanning is implemented.
 * Barcode scanning can plug in later without changing the Scanner UI shell.
 */
export type ScanMode = 'label' | 'barcode';

export type CapturedAsset = {
  uri: string;
  width?: number;
  height?: number;
};
