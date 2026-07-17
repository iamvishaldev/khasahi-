import {
  Alternative,
  Ingredient,
  Nutrition,
  ProductAnalysis,
  UserProfile,
} from '../types/analysis.types';
import {getHealthScoreBand} from '../hooks/getHealthScoreBand';

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

export async function fetchProductAnalysis(
  scanId: string,
  userProfile: UserProfile,
): Promise<ProductAnalysis> {
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
