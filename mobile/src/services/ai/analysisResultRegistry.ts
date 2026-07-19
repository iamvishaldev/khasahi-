import {ProductAnalysis} from '@/features/analysis/types/analysis.types';

/**
 * Bridges the in-flight OpenAI analysis kicked off on the Processing screen
 * to the Analysis screen, so the real API call happens exactly once per
 * scan — Analysis awaits the same promise instead of firing a second
 * request. Consumed (deleted) on first read so a retry always starts fresh.
 */
const pending = new Map<string, Promise<ProductAnalysis>>();

export function registerAnalysisPromise(scanId: string, promise: Promise<ProductAnalysis>): void {
  pending.set(scanId, promise);
}

export function consumeAnalysisPromise(scanId: string): Promise<ProductAnalysis> | undefined {
  const promise = pending.get(scanId);
  pending.delete(scanId);
  return promise;
}
