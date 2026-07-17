import {ProductAnalysis} from '@/features/analysis/types/analysis.types';

export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type SuggestedQuestion = {
  id: string;
  label: string;
};

/**
 * Everything the assistant already knows about the scanned product and the
 * user, so the conversation never has to ask the user to repeat it. Today
 * this is exactly the flagship analysis report; nothing new to model.
 */
export type ChatContext = ProductAnalysis;
