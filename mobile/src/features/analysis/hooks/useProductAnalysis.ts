import {useEffect, useRef, useState} from 'react';
import {useHealthProfileSummary} from '@/features/profile/hooks/useHealthProfileSummary';
import {fetchProductAnalysis} from '../services/analysisDataService';
import {ProductAnalysis} from '../types/analysis.types';

type UseProductAnalysisResult = {
  analysis: ProductAnalysis | null;
  isLoading: boolean;
};

export function useProductAnalysis(scanId: string | undefined): UseProductAnalysisResult {
  const userProfile = useHealthProfileSummary();
  const userProfileRef = useRef(userProfile);
  userProfileRef.current = userProfile;

  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchProductAnalysis(scanId ?? 'unknown-scan', userProfileRef.current).then(result => {
      if (isMounted) {
        setAnalysis(result);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [scanId]);

  return {analysis, isLoading};
}
