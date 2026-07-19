import {DetectedIngredient, NutritionFact, ProcessingResult} from '../types/processing.types';

/**
 * Cosmetic staged-reveal pipeline for the AI Processing screen. The real
 * OpenAI analysis runs separately (kicked off in useProcessingSequence via
 * startProductAnalysis) and is awaited during the final stage — these
 * functions only drive the visual timeline and the chip-reveal animation
 * using generic scan-process labels, never fake ingredient/nutrition data
 * that could be mistaken for real analysis of this product.
 */

const SCAN_STAGE_CHIPS: DetectedIngredient[] = [
  {id: 'text', name: 'Text Detected'},
  {id: 'label', name: 'Label Parsed'},
  {id: 'ingredients', name: 'Ingredient List Found'},
  {id: 'nutrition', name: 'Nutrition Panel Found'},
  {id: 'brand', name: 'Brand Identified'},
  {id: 'image', name: 'Image Enhanced'},
];

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateScanId(): string {
  return `scan-${Math.round(Math.random() * 1_000_000)}`;
}

export async function uploadImage(_photoUri: string): Promise<void> {
  await delay(1100);
}

export async function extractIngredients(): Promise<DetectedIngredient[]> {
  await delay(1500);
  return SCAN_STAGE_CHIPS;
}

export async function analyzeNutrition(): Promise<NutritionFact[]> {
  await delay(1000);
  return [];
}

export async function personalizeForProfile(): Promise<void> {
  await delay(1100);
}

/** Cosmetic minimum for this stage — the real OpenAI call is awaited alongside it. */
export async function generateRecommendations(): Promise<void> {
  await delay(1600);
}

export async function finalizeReport(
  scanId: string,
  photoUri: string,
  ingredients: DetectedIngredient[],
  nutrition: NutritionFact[],
): Promise<ProcessingResult> {
  await delay(400);
  return {scanId, photoUri, ingredients, nutrition};
}
