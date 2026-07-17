import {useCallback, useState} from 'react';
import {CapturedAsset, ScanStatus} from '../types/scanner.types';
import {delay} from '../utils/delay';

const SEARCHING_MS = 700;
const DETECTED_HOLD_MS = 500;
const CAPTURING_MIN_MS = 500;

type UseScanSequenceOptions = {
  onAssetCaptured: (asset: CapturedAsset) => void;
};

type UseScanSequenceResult = {
  status: ScanStatus;
  isBusy: boolean;
  runScanSequence: (acquireAsset: () => Promise<CapturedAsset | undefined>) => Promise<void>;
  reset: () => void;
};

/**
 * Owns the Scanner screen's on-camera status state machine (idle ->
 * searching -> detected -> capturing) independently of the camera itself.
 * `acquireAsset` is injected by the caller so this hook has no opinion on
 * whether the image came from a live capture or the photo gallery. Once an
 * asset is captured it's handed off via `onAssetCaptured` — today that
 * navigates to the Processing screen, which owns everything after this
 * point (upload, OCR, AI analysis). Neither this state machine nor the
 * camera shell needs to change when that pipeline evolves.
 */
export function useScanSequence({
  onAssetCaptured,
}: UseScanSequenceOptions): UseScanSequenceResult {
  const [status, setStatus] = useState<ScanStatus>('idle');

  const reset = useCallback(() => setStatus('idle'), []);

  const runScanSequence = useCallback(
    async (acquireAsset: () => Promise<CapturedAsset | undefined>) => {
      setStatus('searching');
      await delay(SEARCHING_MS);

      setStatus('detected');
      await delay(DETECTED_HOLD_MS);

      setStatus('capturing');
      const [asset] = await Promise.all([acquireAsset(), delay(CAPTURING_MIN_MS)]);
      setStatus('idle');

      if (asset) {
        onAssetCaptured(asset);
      }
    },
    [onAssetCaptured],
  );

  return {
    status,
    isBusy: status !== 'idle',
    runScanSequence,
    reset,
  };
}
