import {env} from '@/utils/env';
import {readImageAsBase64DataUrl} from './imageBase64';

export type OpenAIIngredient = {
  name: string;
  risk: 'Low' | 'Moderate' | 'High';
  reason: string;
};

export type OpenAINutritionFact = {
  label: string;
  value: string;
};

export type OpenAIAlternative = {
  name: string;
  reason: string;
};

export type OpenAIVisionAnalysis = {
  productName: string;
  brand: string;
  healthScore: number;
  verdict: string;
  verdictDetail: string;
  nutritionSummary: string;
  nutritionFacts: OpenAINutritionFact[];
  ingredients: OpenAIIngredient[];
  betterAlternatives: OpenAIAlternative[];
  personalizedRecommendation: string;
};

const SYSTEM_PROMPT = `You are a food-label intelligence engine. Given a photo of a packaged food product (front of pack and/or ingredients/nutrition panel), analyze it and return STRICT JSON ONLY matching this exact shape, no markdown, no commentary:
{
  "productName": string,
  "brand": string,
  "healthScore": number (0-100),
  "verdict": string (e.g. "Good Choice", "Moderate Caution", "Avoid Frequent Consumption"),
  "verdictDetail": string (1-2 sentences explaining the verdict),
  "nutritionSummary": string (1-2 sentences summarizing calories/macros),
  "nutritionFacts": [{"label": string, "value": string}] (Calories, Sugar, Protein, Fat, Sodium, Fiber if visible/inferable),
  "ingredients": [{"name": string, "risk": "Low"|"Moderate"|"High", "reason": string}],
  "betterAlternatives": [{"name": string, "reason": string}] (1-3 real, healthier packaged alternatives),
  "personalizedRecommendation": string (tailored to the user profile provided)
}
If the image is unclear, make reasonable best-effort estimates rather than refusing.`;

async function callOpenAIVision(
  imageDataUrl: string,
  userContext: string,
): Promise<OpenAIVisionAnalysis> {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      max_tokens: 1200,
      response_format: {type: 'json_object'},
      messages: [
        {role: 'system', content: SYSTEM_PROMPT},
        {
          role: 'user',
          content: [
            {type: 'text', text: userContext},
            {type: 'image_url', image_url: {url: imageDataUrl}},
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`OpenAI request failed (${response.status}): ${errorBody}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI response missing content');
  }

  return JSON.parse(content) as OpenAIVisionAnalysis;
}

export async function analyzeProductImage(
  photoUri: string,
  userContext: string,
): Promise<OpenAIVisionAnalysis> {
  const imageDataUrl = await readImageAsBase64DataUrl(photoUri);
  return callOpenAIVision(imageDataUrl, userContext);
}
