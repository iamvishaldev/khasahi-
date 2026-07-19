import {useCallback, useEffect, useRef, useState} from 'react';
import {useHealthProfileSummary} from '@/features/profile/hooks/useHealthProfileSummary';
import {fetchProductAnalysis} from '../services/analysisDataService';
import {ProductAnalysis} from '../types/analysis.types';

type UseProductAnalysisResult = {
  analysis: ProductAnalysis | null;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
};

export function useProductAnalysis(scanId: string | undefined): UseProductAnalysisResult {
  const userProfile = useHealthProfileSummary();
  const userProfileRef = useRef(userProfile);
  userProfileRef.current = userProfile;

  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchProductAnalysis(scanId ?? 'unknown-scan', userProfileRef.current)
      .then(result => {
        if (isMounted) {
          setAnalysis(result);
          setIsLoading(false);
        }
      })
      .catch((fetchError: unknown) => {
        if (isMounted) {
          setAnalysis(null);
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : 'AI analysis failed. Please try again.',
          );
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [scanId, attempt]);

  const retry = useCallback(() => setAttempt(value => value + 1), []);

  return {analysis, isLoading, error, retry};
}
