/**
 * In-memory bridge from a scanId to the photo that produced it. Processing
 * registers the pair when it finalizes a report; Analysis looks it up to
 * run the real vision analysis instead of the mock data.
 */
const scanPhotos = new Map<string, string>();

export function registerScanPhoto(scanId: string, photoUri: string): void {
  scanPhotos.set(scanId, photoUri);
}

export function getScanPhoto(scanId: string): string | undefined {
  return scanPhotos.get(scanId);
}
