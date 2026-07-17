import {ScanStatus, ScanStatusCopy} from '../types/scanner.types';

export function getScanStatusCopy(status: ScanStatus): ScanStatusCopy {
  switch (status) {
    case 'searching':
      return {
        label: 'Searching for label...',
        description: 'Point your camera at the ingredient list.',
      };
    case 'detected':
      return {
        label: '✓ Label Detected',
        description: 'Hold steady to capture.',
      };
    case 'capturing':
      return {
        label: 'Capturing…',
        description: 'Hold steady.',
      };
    case 'idle':
    default:
      return {
        label: '🟢 AI Ready',
        description: 'Point your camera at the ingredient list.',
      };
  }
}
