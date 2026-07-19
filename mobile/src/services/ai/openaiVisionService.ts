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

const SYSTEM_PROMPT = `You are a food-label intelligence engine for a consumer app. Given a photo of a packaged food product (front of pack and/or ingredients/nutrition panel), analyze it and return STRICT JSON ONLY matching this exact shape, no markdown, no commentary:
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
Write every explanation (verdictDetail, ingredient reasons, personalizedRecommendation) in plain, simple language a non-technical grocery shopper would understand — explain WHY something matters (e.g. "high in added sugar, which can spike blood sugar" rather than just "high sugar"), never use clinical or overly technical jargon. Keep every string concise — this is read on a phone screen, not a report.
If the image is unclear, make reasonable best-effort estimates rather than refusing.`;

const REQUEST_TIMEOUT_MS = 25_000;

async function callOpenAIVision(
  imageDataUrl: string,
  userContext: string,
): Promise<OpenAIVisionAnalysis> {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
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
  } catch (fetchError) {
    if (fetchError instanceof Error && fetchError.name === 'AbortError') {
      throw new Error('The AI took too long to respond. Please try again.');
    }
    throw new Error('Could not reach OpenAI — check your internet connection and try again.');
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    console.warn('OpenAI request failed', response.status, errorBody);

    if (response.status === 429) {
      throw new Error(
        'Our AI usage limit has been reached for now. Please check back shortly.',
      );
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error('AI service is not configured correctly. Please contact support.');
    }
    if (response.status >= 500) {
      throw new Error('OpenAI is temporarily unavailable. Please try again in a moment.');
    }
    throw new Error('AI analysis failed. Please try again.');
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI response missing content');
  }

  try {
    return JSON.parse(content) as OpenAIVisionAnalysis;
  } catch {
    throw new Error('AI returned an unexpected response. Please try again.');
  }
}

export async function analyzeProductImage(
  photoUri: string,
  userContext: string,
): Promise<OpenAIVisionAnalysis> {
  const imageDataUrl = await readImageAsBase64DataUrl(photoUri);
  return callOpenAIVision(imageDataUrl, userContext);
}
