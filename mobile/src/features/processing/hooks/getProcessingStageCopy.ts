import {ProcessingStage} from '../types/processing.types';

export type ProcessingStageCopy = {
  title: string;
  rotatingMessages?: string[];
};

export function getProcessingStageCopy(stage: ProcessingStage): ProcessingStageCopy {
  switch (stage) {
    case 'uploading':
      return {title: 'Uploading Image...'};
    case 'reading':
      return {title: 'Reading Ingredient List...'};
    case 'nutrition':
      return {title: 'Understanding Nutrition Facts...'};
    case 'profile':
      return {title: 'Checking Against Your Health Profile...'};
    case 'recommendations':
      return {
        title: 'Generating AI Recommendations...',
        rotatingMessages: [
          'Comparing healthier alternatives…',
          'Scoring ingredients against your goals…',
          'Personalizing your insights…',
        ],
      };
    case 'finalizing':
    default:
      return {title: 'Finalizing Report...'};
  }
}
