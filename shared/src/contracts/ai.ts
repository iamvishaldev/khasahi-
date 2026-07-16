import {LifestyleSelection} from './lifestyle';

export interface NutritionFacts {
  calories?: number;
  proteinGrams?: number;
  carbohydratesGrams?: number;
  sugarGrams?: number;
  fatGrams?: number;
  saturatedFatGrams?: number;
  fiberGrams?: number;
  sodiumMilligrams?: number;
  servingSize?: string;
}

export interface ProductIngredient {
  name: string;
  rawText?: string;
}

export interface PersonalizationContext {
  lifestyle: LifestyleSelection;
  healthGoals: string[];
  dietaryPreferences: string[];
  allergies: string[];
  age?: number;
}

export interface ProductAnalysisContext {
  productName?: string;
  brandName?: string;
  ingredients: ProductIngredient[];
  nutritionFacts?: NutritionFacts;
}

export interface LifestyleSignal {
  category: 'lifestyle' | 'health-goal' | 'dietary-preference' | 'allergy' | 'age';
  signalId: string;
  label: string;
  sourceValue: string;
}

export interface PersonalizedAnalysis {
  summary: string;
  healthScore: number | null;
  reasonHighlights: string[];
  healthierAlternatives: string[];
  personalizationApplied: LifestyleSignal[];
}

