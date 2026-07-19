import {getScanPhoto} from '@/services/ai/scanPhotoRegistry';
import {analyzeProductImage, OpenAIVisionAnalysis} from '@/services/ai/openaiVisionService';
import {
  Alternative,
  Ingredient,
  IngredientRisk,
  Nutrition,
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

/**
 * Mock flagship-report backend.
 *
 * `fetchProductAnalysis` is the single extension point: swap its body for
 * a real call — the OpenAI Responses API for the verdict/recommendation/
 * confidence, a Nutrition API and Barcode API for product + nutrition
 * facts, and the OCR result for ingredients — and ProductAnalysisScreen
 * plus every component it renders keeps working unchanged, since they
 * only depend on the `ProductAnalysis` shape below.
 */

const MOCK_INGREDIENTS: Ingredient[] = [
  {
    id: 'sugar',
    name: 'Sugar',
    risk: 'high',
    explanation:
      'Added sugars may increase calorie intake and contribute to metabolic issues when consumed in excess.',
    confidence: 95,
  },
  {
    id: 'palm-oil',
    name: 'Palm Oil',
    risk: 'high',
    explanation:
      'High in saturated fat, which can raise cholesterol levels with frequent consumption.',
    confidence: 90,
  },
  {
    id: 'milk-solids',
    name: 'Milk Solids',
    risk: 'moderate',
    explanation:
      'A concentrated dairy ingredient that adds calories and saturated fat, though it is not a major concern on its own.',
    confidence: 82,
  },
  {
    id: 'cocoa-butter',
    name: 'Cocoa Butter',
    risk: 'low',
    explanation:
      'A natural fat from cocoa beans. Generally fine in moderation as part of a balanced diet.',
    confidence: 88,
  },
  {
    id: 'artificial-flavor',
    name: 'Artificial Flavor',
    risk: 'moderate',
    explanation:
      'Synthetic flavoring compounds. Considered safe in small amounts but flagged for shoppers who prefer minimally processed foods.',
    confidence: 76,
  },
];

const MOCK_NUTRITION: Nutrition[] = [
  {id: 'calories', label: 'Calories', value: '534 kcal', icon: '🔥'},
  {id: 'sugar', label: 'Sugar', value: '57g', icon: '🍬'},
  {id: 'protein', label: 'Protein', value: '7g', icon: '💪'},
  {id: 'fat', label: 'Fat', value: '30g', icon: '🥑'},
  {id: 'sodium', label: 'Sodium', value: '120mg', icon: '🧂'},
  {id: 'fiber', label: 'Fiber', value: '2g', icon: '🌾'},
];

const MOCK_ALTERNATIVES: Alternative[] = [
  {
    id: 'amul-dark-chocolate',
    name: 'Amul Dark Chocolate',
    healthScore: 88,
    reason: 'Lower Sugar',
  },
  {
    id: 'lindt-70',
    name: 'Lindt 70%',
    healthScore: 92,
    reason: 'Higher Cocoa Content',
  },
];

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buildRecommendationMessage(userProfile: UserProfile): string {
  return `Due to your ${userProfile.lifestyleLabel} lifestyle and your goal to ${userProfile.goalLabel.toLowerCase()}, this product is not an ideal choice. Consider consuming it occasionally.`;
}

async function fetchRealProductAnalysis(
  scanId: string,
  photoUri: string,
  userProfile: UserProfile,
): Promise<ProductAnalysis> {
  const userContext = `The user's lifestyle profile is "${userProfile.lifestyleLabel}" and their health goal is "${userProfile.goalLabel}". Personalize the recommendation for them.`;
  const vision = await analyzeProductImage(photoUri, userContext);
  return mapVisionAnalysisToProductAnalysis(scanId, photoUri, userProfile, vision);
}

export async function fetchProductAnalysis(
  scanId: string,
  userProfile: UserProfile,
): Promise<ProductAnalysis> {
  const photoUri = getScanPhoto(scanId);
  if (photoUri) {
    try {
      return await fetchRealProductAnalysis(scanId, photoUri, userProfile);
    } catch (error) {
      console.warn('Falling back to mock analysis; OpenAI Vision call failed', error);
    }
  }

  await delay(600);

  const scoreValue = 42;
  const {band, label} = getHealthScoreBand(scoreValue);

  return {
    product: {
      id: scanId,
      name: 'Cadbury Dairy Milk',
      brand: 'Cadbury',
      category: 'Chocolate',
      scanDate: new Date().toISOString(),
    },
    healthScore: {value: scoreValue, band, label},
    verdict: {
      headline: '⚠ High in Added Sugar',
      body: 'This product contains high levels of added sugar and saturated fat. Frequent consumption may negatively impact your long-term health.',
    },
    confidence: {
      percent: 98,
      basedOn: [
        'Ingredient List',
        'Nutrition Facts',
        'Product Category',
        'Your Health Profile',
      ],
    },
    userProfile,
    recommendation: {message: buildRecommendationMessage(userProfile)},
    ingredients: MOCK_INGREDIENTS,
    nutrition: MOCK_NUTRITION,
    alternatives: MOCK_ALTERNATIVES,
  };
}
