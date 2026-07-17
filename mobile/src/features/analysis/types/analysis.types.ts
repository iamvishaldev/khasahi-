import {HealthProfileSummary} from '@/features/profile/hooks/useHealthProfileSummary';

export type HealthScoreBand = 'excellent' | 'good' | 'moderate' | 'needsImprovement';

export type HealthScore = {
  value: number;
  band: HealthScoreBand;
  label: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUri?: string;
  scanDate: string;
};

export type IngredientRisk = 'low' | 'moderate' | 'high';

export type Ingredient = {
  id: string;
  name: string;
  risk: IngredientRisk;
  explanation: string;
  confidence: number;
};

export type NutritionFactId = 'calories' | 'sugar' | 'protein' | 'fat' | 'sodium' | 'fiber';

export type Nutrition = {
  id: NutritionFactId;
  label: string;
  value: string;
  icon: string;
};

export type Alternative = {
  id: string;
  name: string;
  healthScore: number;
  reason: string;
  imageUri?: string;
};

export type AIVerdict = {
  headline: string;
  body: string;
};

export type AIConfidence = {
  percent: number;
  basedOn: string[];
};

export type AIRecommendation = {
  message: string;
};

export type UserProfile = HealthProfileSummary;

/**
 * The full flagship report. Today `analysisDataService` assembles this
 * from realistic mock data; once the OpenAI Responses API, a Nutrition
 * API, a Barcode API, and real OCR results are wired in, this is the same
 * contract they'd populate — ProductAnalysisScreen and every component
 * below it stay unchanged.
 */
export type ProductAnalysis = {
  product: Product;
  healthScore: HealthScore;
  verdict: AIVerdict;
  confidence: AIConfidence;
  userProfile: UserProfile;
  recommendation: AIRecommendation;
  ingredients: Ingredient[];
  nutrition: Nutrition[];
  alternatives: Alternative[];
};
