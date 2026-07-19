import {registerScanPhoto} from '@/services/ai/scanPhotoRegistry';
import {DetectedIngredient, NutritionFact, ProcessingResult} from '../types/processing.types';

/**
 * Mock backend pipeline for the AI Processing screen.
 *
 * Each function below is a named extension point: swap its body for a real
 * call — image upload, OCR text extraction, a Barcode API lookup, a
 * Nutrition Database query, or the OpenAI Responses API for personalized
 * recommendations — and nothing in `useProcessingSequence` or the UI
 * components needs to change, since they only depend on these signatures.
 */

const MOCK_INGREDIENTS: DetectedIngredient[] = [
  {id: 'sugar', name: 'Sugar'},
  {id: 'palm-oil', name: 'Palm Oil'},
  {id: 'cocoa-butter', name: 'Cocoa Butter'},
  {id: 'milk-solids', name: 'Milk Solids'},
  {id: 'salt', name: 'Salt'},
  {id: 'natural-flavor', name: 'Natural Flavor'},
];

const MOCK_NUTRITION: NutritionFact[] = [
  {id: 'calories', label: 'Calories', value: '210 kcal'},
  {id: 'sugar', label: 'Sugar', value: '18g'},
  {id: 'protein', label: 'Protein', value: '3g'},
  {id: 'fat', label: 'Fat', value: '11g'},
];

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Extension point: real image upload to storage/backend. */
export async function uploadImage(_photoUri: string): Promise<void> {
  await delay(1100);
}

/** Extension point: OCR text extraction (and/or Barcode API lookup). */
export async function extractIngredients(): Promise<DetectedIngredient[]> {
  await delay(1500);
  return MOCK_INGREDIENTS;
}

/** Extension point: Nutrition Database lookup. */
export async function analyzeNutrition(): Promise<NutritionFact[]> {
  await delay(1000);
  return MOCK_NUTRITION;
}

/** Extension point: cross-reference against the user's stored health profile. */
export async function personalizeForProfile(): Promise<void> {
  await delay(1100);
}

/** Extension point: OpenAI Responses API call for tailored recommendations. */
export async function generateRecommendations(): Promise<void> {
  await delay(1600);
}

/** Extension point: assemble + persist the final report server-side. */
export async function finalizeReport(
  photoUri: string,
  ingredients: DetectedIngredient[],
  nutrition: NutritionFact[],
): Promise<ProcessingResult> {
  await delay(700);
  const scanId = `scan-${Math.round(Math.random() * 1_000_000)}`;
  registerScanPhoto(scanId, photoUri);
  return {
    scanId,
    photoUri,
    ingredients,
    nutrition,
  };
}
