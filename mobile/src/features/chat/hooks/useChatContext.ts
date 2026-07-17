import {useProductAnalysis} from '@/features/analysis/hooks/useProductAnalysis';
import {ChatContext} from '../types/chat.types';

type UseChatContextResult = {
  context: ChatContext | null;
  isLoading: boolean;
};

/**
 * Reuses the same flagship analysis report the Product Analysis screen
 * shows — the assistant never needs the user to repeat the product,
 * ingredients, nutrition, health score, lifestyle, or goal, because it's
 * all right here.
 */
export function useChatContext(scanId: string | undefined): UseChatContextResult {
  const {analysis, isLoading} = useProductAnalysis(scanId);
  return {context: analysis, isLoading};
}
