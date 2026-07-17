import {useCallback, useState} from 'react';

type UseCameraReadyStateResult = {
  isCameraReady: boolean;
  markCameraReady: () => void;
};

/**
 * Tracks whether the native Camera view has finished initializing, so the
 * Scanner screen can show a loading state instead of a blank/frozen preview
 * for the brief window between mount and Vision Camera's `onInitialized`.
 */
export function useCameraReadyState(): UseCameraReadyStateResult {
  const [isCameraReady, setIsCameraReady] = useState(false);

  const markCameraReady = useCallback(() => setIsCameraReady(true), []);

  return {isCameraReady, markCameraReady};
}
