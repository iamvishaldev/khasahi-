import {getScanPhoto, registerScanPhoto} from '@/services/ai/scanPhotoRegistry';
import {analyzeProductImage, OpenAIVisionAnalysis} from '@/services/ai/openaiVisionService';
import {
  consumeAnalysisPromise,
  registerAnalysisPromise,
} from '@/services/ai/analysisResultRegistry';
import {
  IngredientRisk,
  NutritionFactId,
  ProductAnalysis,
  UserProfile,
} from '../types/analysis.types';
import {getHealthScoreBand} from '../hooks/getHealthScoreBand';

const NUTRITION_ICONS: Record<string, string> = {
  calories: '🔥',
  sugar: '🍬',
  protein: '💪',
  fat: '🥑',
  sodium: '🧂',
  fiber: '🌾',
};

function toRisk(risk: string): IngredientRisk {
  const normalized = risk.toLowerCase();
  if (normalized === 'high' || normalized === 'moderate' || normalized === 'low') {
    return normalized;
  }
  return 'moderate';
}

function toNutritionId(label: string): NutritionFactId {
  const normalized = label.toLowerCase();
  const known: NutritionFactId[] = ['calories', 'sugar', 'protein', 'fat', 'sodium', 'fiber'];
  return known.find(id => normalized.includes(id)) ?? 'calories';
}

function mapVisionAnalysisToProductAnalysis(
  scanId: string,
  photoUri: string,
  userProfile: UserProfile,
  vision: OpenAIVisionAnalysis,
): ProductAnalysis {
  const {band, label} = getHealthScoreBand(vision.healthScore);

  return {
    product: {
      id: scanId,
      name: vision.productName || 'Unknown Product',
      brand: vision.brand || 'Unknown Brand',
      category: '',
      imageUri: photoUri,
      scanDate: new Date().toISOString(),
    },
    healthScore: {value: vision.healthScore, band, label},
    verdict: {
      headline: vision.verdict,
      body: vision.verdictDetail || vision.nutritionSummary,
    },
    confidence: {
      percent: 90,
      basedOn: ['OpenAI Vision Analysis', 'Ingredient List', 'Your Health Profile'],
    },
    userProfile,
    recommendation: {message: vision.personalizedRecommendation},
    ingredients: vision.ingredients.map((ingredient, index) => ({
      id: `${index}-${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: ingredient.name,
      risk: toRisk(ingredient.risk),
      explanation: ingredient.reason,
      confidence: 90,
    })),
    nutrition: vision.nutritionFacts.map(fact => {
      const id = toNutritionId(fact.label);
      return {id, label: fact.label, value: fact.value, icon: NUTRITION_ICONS[id]};
    }),
    alternatives: vision.betterAlternatives.map((alt, index) => ({
      id: `${index}-${alt.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: alt.name,
      healthScore: Math.min(98, vision.healthScore + 15),
      reason: alt.reason,
    })),
  };
}

async function runRealAnalysis(
  scanId: string,
  photoUri: string,
  userProfile: UserProfile,
): Promise<ProductAnalysis> {
  const userContext = `The user's lifestyle profile is "${userProfile.lifestyleLabel}" and their health goal is "${userProfile.goalLabel}". Personalize the recommendation for them.`;
  const vision = await analyzeProductImage(photoUri, userContext);
  return mapVisionAnalysisToProductAnalysis(scanId, photoUri, userProfile, vision);
}

/**
 * Kicks off the real OpenAI analysis immediately (called from the
 * Processing screen, as soon as the photo is captured) so the AI
 * Processing screen's stages track the actual API call instead of a
 * disconnected fake timer. Analysis screen picks up the same promise via
 * `fetchProductAnalysis` below — the API is only ever called once per scan.
 */
export function startProductAnalysis(
  scanId: string,
  photoUri: string,
  userProfile: UserProfile,
): Promise<ProductAnalysis> {
  registerScanPhoto(scanId, photoUri);
  const promise = runRealAnalysis(scanId, photoUri, userProfile);
  registerAnalysisPromise(scanId, promise);
  promise.catch(() => {}); // avoid an unhandled-rejection warning before it's consumed
  return promise;
}

export async function fetchProductAnalysis(
  scanId: string,
  userProfile: UserProfile,
): Promise<ProductAnalysis> {
  const inFlight = consumeAnalysisPromise(scanId);
  if (inFlight) {
    return inFlight;
  }

  const photoUri = getScanPhoto(scanId);
  if (!photoUri) {
    throw new Error('We could not find the scanned photo for this product.');
  }

  return runRealAnalysis(scanId, photoUri, userProfile);
}
