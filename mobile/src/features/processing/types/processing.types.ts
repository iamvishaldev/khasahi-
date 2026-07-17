import {CapturedAsset} from '@/features/scanner/types/scanner.types';
import {HealthProfileSummary} from '@/features/profile/hooks/useHealthProfileSummary';

export type ProcessingStage =
  | 'uploading'
  | 'reading'
  | 'nutrition'
  | 'profile'
  | 'recommendations'
  | 'finalizing';

export const PROCESSING_STAGE_ORDER: ProcessingStage[] = [
  'uploading',
  'reading',
  'nutrition',
  'profile',
  'recommendations',
  'finalizing',
];

export type DetectedIngredient = {
  id: string;
  name: string;
};

export type NutritionFact = {
  id: string;
  label: string;
  value: string;
};

/**
 * Placeholder shape for the real analysis payload. Today it's assembled
 * from mock ingredient/nutrition data; once the OCR, OpenAI Responses API,
 * Barcode API, and Nutrition Database are wired in, this is the contract
 * ProductAnalysisScreen keeps consuming — nothing above it needs to change.
 */
export type ProcessingResult = {
  scanId: string;
  photoUri: string;
  ingredients: DetectedIngredient[];
  nutrition: NutritionFact[];
};

export type {CapturedAsset, HealthProfileSummary};
