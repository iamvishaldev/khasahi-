import DocumentScanner, {
  ResponseType,
  ScanDocumentResponseStatus,
} from 'react-native-document-scanner-plugin';
import {CapturedAsset} from '../types/scanner.types';

function normalizeUri(uri: string): string {
  return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(uri) ? uri : `file://${uri}`;
}

/**
 * Swappable capture abstraction: launches the native document scanner
 * (automatic edge detection + perspective correction) and returns the
 * highest-quality cropped image, or undefined if the user cancels. Swap
 * this implementation to change the capture method without touching
 * ScannerScreen or anything downstream in the analysis pipeline.
 */
export async function scanProductDocument(): Promise<CapturedAsset | undefined> {
  const result = await DocumentScanner.scanDocument({
    responseType: ResponseType.ImageFilePath,
    croppedImageQuality: 100,
    maxNumDocuments: 1,
  });

  if (result.status !== ScanDocumentResponseStatus.Success) {
    return undefined;
  }

  const uri = result.scannedImages?.[0];
  return uri ? {uri: normalizeUri(uri)} : undefined;
}
