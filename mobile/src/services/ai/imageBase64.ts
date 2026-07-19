/**
 * Reads a local file:// image URI as a base64 data URL without any native
 * module — RN's JS runtime already polyfills fetch/Blob/FileReader, so this
 * works on both platforms with zero extra native linking.
 */
export function readImageAsBase64DataUrl(photoUri: string): Promise<string> {
  return fetch(photoUri)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = () => reject(reader.error ?? new Error('Failed to read image'));
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        }),
    );
}
