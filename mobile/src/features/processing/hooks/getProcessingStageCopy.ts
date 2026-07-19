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
      return {title: 'Reading Food Label...'};
    case 'nutrition':
      return {title: 'Extracting Ingredients...'};
    case 'profile':
      return {title: 'Analyzing with OpenAI...'};
    case 'recommendations':
      return {
        title: 'Generating Personalized Insights...',
        rotatingMessages: [
          'Reasoning about your health goals…',
          'Comparing healthier alternatives…',
          'Scoring ingredient risk…',
        ],
      };
    case 'finalizing':
    default:
      return {title: 'Preparing Your Health Report...'};
  }
}
