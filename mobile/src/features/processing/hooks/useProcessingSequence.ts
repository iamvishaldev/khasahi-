import {useEffect, useRef, useState} from 'react';
import {
  analyzeNutrition,
  delay,
  extractIngredients,
  finalizeReport,
  generateRecommendations,
  personalizeForProfile,
  uploadImage,
} from './processingPipeline';
import {DetectedIngredient, ProcessingResult, ProcessingStage} from '../types/processing.types';

const TOTAL_ESTIMATE_SECONDS = 9;
// Gives the staggered ingredient-chip entrance animation (6 chips, ~130ms
// stagger + spring settle) time to actually finish playing before the
// timeline advances past the "reading" stage.
const INGREDIENT_REVEAL_HOLD_MS = 1300;

type UseProcessingSequenceOptions = {
  photoUri: string;
  onFinished: (result: ProcessingResult) => void;
};

type UseProcessingSequenceResult = {
  stage: ProcessingStage;
  ingredients: DetectedIngredient[];
  remainingSeconds: number;
  cancel: () => void;
};

/**
 * Owns the AI Processing screen's 6-stage timeline. It has no opinion on
 * how each stage is presented — that's the UI components' job — only on
 * sequencing the mock pipeline calls, surfacing their data as it arrives,
 * and reporting a rough remaining-time estimate. Swapping the mock pipeline
 * functions for real OCR/OpenAI/Barcode/Nutrition-DB calls requires no
 * change here beyond the import.
 */
export function useProcessingSequence({
  photoUri,
  onFinished,
}: UseProcessingSequenceOptions): UseProcessingSequenceResult {
  const [stage, setStage] = useState<ProcessingStage>('uploading');
  const [ingredients, setIngredients] = useState<DetectedIngredient[]>([]);
  const [remainingSeconds, setRemainingSeconds] = useState(TOTAL_ESTIMATE_SECONDS);
  const cancelledRef = useRef(false);
  const onFinishedRef = useRef(onFinished);

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingSeconds(seconds => Math.max(0, seconds - 1));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      await uploadImage(photoUri);
      if (!isMounted || cancelledRef.current) {
        return;
      }

      setStage('reading');
      const extractedIngredients = await extractIngredients();
      if (!isMounted || cancelledRef.current) {
        return;
      }
      setIngredients(extractedIngredients);
      await delay(INGREDIENT_REVEAL_HOLD_MS);
      if (!isMounted || cancelledRef.current) {
        return;
      }

      setStage('nutrition');
      const nutrition = await analyzeNutrition();
      if (!isMounted || cancelledRef.current) {
        return;
      }

      setStage('profile');
      await personalizeForProfile();
      if (!isMounted || cancelledRef.current) {
        return;
      }

      setStage('recommendations');
      await generateRecommendations();
      if (!isMounted || cancelledRef.current) {
        return;
      }

      setStage('finalizing');
      const result = await finalizeReport(photoUri, extractedIngredients, nutrition);
      if (!isMounted || cancelledRef.current) {
        return;
      }

      onFinishedRef.current(result);
    }

    run().catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [photoUri]);

  function cancel() {
    cancelledRef.current = true;
  }

  return {stage, ingredients, remainingSeconds, cancel};
}
