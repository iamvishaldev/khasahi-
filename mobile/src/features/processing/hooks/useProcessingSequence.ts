import {useEffect, useRef, useState} from 'react';
import {startProductAnalysis} from '@/features/analysis/services/analysisDataService';
import {UserProfile} from '@/features/analysis/types/analysis.types';
import {
  analyzeNutrition,
  delay,
  extractIngredients,
  finalizeReport,
  generateRecommendations,
  generateScanId,
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
  userProfile: UserProfile;
  onFinished: (result: ProcessingResult) => void;
};

type UseProcessingSequenceResult = {
  stage: ProcessingStage;
  ingredients: DetectedIngredient[];
  remainingSeconds: number;
  cancel: () => void;
};

/**
 * Owns the AI Processing screen's 6-stage timeline. The real OpenAI vision
 * analysis is kicked off immediately (in parallel with the visual stages,
 * not after them) so the "AI is working" moment on screen corresponds to
 * an actual in-flight API call — the final stage waits on that same
 * promise before handing off, so screen duration reflects real latency.
 * The Analysis screen picks up this exact result via the analysis result
 * registry, so the API is only ever called once per scan.
 */
export function useProcessingSequence({
  photoUri,
  userProfile,
  onFinished,
}: UseProcessingSequenceOptions): UseProcessingSequenceResult {
  const [stage, setStage] = useState<ProcessingStage>('uploading');
  const [ingredients, setIngredients] = useState<DetectedIngredient[]>([]);
  const [remainingSeconds, setRemainingSeconds] = useState(TOTAL_ESTIMATE_SECONDS);
  const cancelledRef = useRef(false);
  const onFinishedRef = useRef(onFinished);
  // useHealthProfileSummary() returns a new object every render — reading
  // it via ref (instead of putting it in the effect's deps) keeps the
  // pipeline effect below from restarting on every parent re-render.
  const userProfileRef = useRef(userProfile);
  userProfileRef.current = userProfile;

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
    const scanId = generateScanId();
    const analysisPromise = startProductAnalysis(scanId, photoUri, userProfileRef.current);

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
      // Hold here until the real OpenAI call actually settles — if it
      // finished earlier, this resolves immediately; if it's slower than
      // the cosmetic minimum, the screen honestly waits for it.
      await analysisPromise.catch(() => {});
      if (!isMounted || cancelledRef.current) {
        return;
      }

      const result = await finalizeReport(scanId, photoUri, extractedIngredients, nutrition);
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
