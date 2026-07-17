import {ChatContext, ChatMessage, SuggestedQuestion} from '../types/chat.types';

/**
 * Mock AI response engine for the food-intelligence chat.
 *
 * `generateAssistantReply` is the single extension point: swap its body
 * for a real OpenAI Responses API call (streaming the reply token-by-token
 * instead of resolving the full string at once) and nothing in
 * `useChatConversation` or any chat component needs to change, since they
 * only depend on this function's signature — `(question, context, history)
 * => Promise<string>`.
 */

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {id: 'explain-ingredients', label: 'Explain every ingredient'},
  {id: 'diabetic-safe', label: 'Is this safe for diabetics?'},
  {id: 'child-safe', label: 'Can children eat this?'},
  {id: 'liver-health', label: 'Will this affect liver health?'},
  {id: 'compare-product', label: 'Compare with another product'},
  {id: 'suggest-alternatives', label: 'Suggest healthier alternatives'},
  {id: 'post-workout', label: 'Should I eat this after a workout?'},
  {id: 'harmful-additives', label: 'Are there any harmful additives?'},
];

const REPLY_LATENCY_MS = 1100;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function topRiskIngredient(context: ChatContext) {
  const weight = {high: 3, moderate: 2, low: 1} as const;
  return [...context.ingredients].sort((a, b) => weight[b.risk] - weight[a.risk])[0];
}

function findNutrition(context: ChatContext, id: string) {
  return context.nutrition.find(fact => fact.id === id);
}

function formatIngredientList(context: ChatContext): string {
  return context.ingredients
    .map(ingredient => `• **${ingredient.name}** (${ingredient.risk} risk) — ${ingredient.explanation}`)
    .join('\n');
}

function formatAlternativesList(context: ChatContext): string {
  return context.alternatives
    .map(alt => `• **${alt.name}** — Score ${alt.healthScore}/100, ${alt.reason}`)
    .join('\n');
}

function buildReply(question: string, context: ChatContext): string {
  const q = question.toLowerCase();
  const sugar = findNutrition(context, 'sugar');
  const protein = findNutrition(context, 'protein');
  const risk = topRiskIngredient(context);
  const firstAlternative = context.alternatives[0];

  if (/diabet|blood sugar/.test(q)) {
    return `${context.product.name} contains approximately ${sugar?.value ?? 'a notable amount of'} of sugar per serving.\n\nFor someone managing diabetes, frequent consumption may lead to blood sugar spikes. A better option would be ${firstAlternative?.name ?? 'a lower-sugar alternative'}${firstAlternative ? `, which has ${firstAlternative.reason.toLowerCase()}` : ''}.`;
  }

  if (/child|kid/.test(q)) {
    return `In small, occasional portions, ${context.product.name} is generally fine for children. With ${sugar?.value ?? 'its sugar content'} of sugar per serving though, it's best treated as a treat rather than a regular snack.`;
  }

  if (/liver/.test(q)) {
    return `Since your goal is to ${context.userProfile.goalLabel.toLowerCase()}, it's worth knowing that frequent intake of foods high in added sugar and saturated fat — like this one — can add extra strain on liver function over time.\n\nOccasional enjoyment is fine, but I'd lean on the healthier alternatives below for regular snacking.`;
  }

  if (/compar|alternative|healthier/.test(q)) {
    return `Here's how ${context.product.name} stacks up against healthier options:\n\n${formatAlternativesList(context)}\n\nBoth score meaningfully higher than this product's ${context.healthScore.value}/100.`;
  }

  if (/explain|every ingredient|^ingredients?$/.test(q)) {
    return `Here's a breakdown of each ingredient:\n\n${formatIngredientList(context)}`;
  }

  if (/workout|exercise|gym/.test(q)) {
    return `Right after a workout your body prioritizes protein and fast-digesting carbs for recovery. ${context.product.name} only has ${protein?.value ?? 'a small amount'} of protein and a high sugar load, so it isn't an ideal recovery snack — a protein-forward option would serve you better.`;
  }

  if (/harmful|additive|artificial/.test(q)) {
    const artificial = context.ingredients.find(ingredient =>
      ingredient.name.toLowerCase().includes('artificial'),
    );
    return artificial
      ? `The main additive worth noting is **${artificial.name}** — ${artificial.explanation}\n\nIt's considered safe by food regulators at typical usage levels, but flagged here since you may prefer minimally processed foods.`
      : `I didn't find any flagged artificial additives, though ${risk.name.toLowerCase()} is worth moderating given its ${risk.risk} risk rating.`;
  }

  return `Based on ${context.product.name}'s profile — a Health Score of ${context.healthScore.value}/100 (${context.healthScore.label}) — ${context.verdict.body}\n\nLet me know if you'd like ingredient-by-ingredient detail or healthier alternatives.`;
}

export async function generateAssistantReply(
  question: string,
  context: ChatContext,
  _history: ChatMessage[],
): Promise<string> {
  await delay(REPLY_LATENCY_MS);
  return buildReply(question, context);
}
