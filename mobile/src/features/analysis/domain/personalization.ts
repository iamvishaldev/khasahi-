import {LifestyleFieldAnswer, LifestyleSelection} from '@shared/index';
import {findLifestyleProfile} from '@/features/profile/data/lifestyleProfiles';

export function hasRequiredLifestyleAnswers(
  selection: LifestyleSelection,
): boolean {
  const profile = findLifestyleProfile(selection.profileId);

  if (!profile) {
    return false;
  }

  return profile.fields
    .filter(field => field.required)
    .every(field =>
      selection.answers.some(answer => isAnswerForRequiredField(field.id, answer)),
    );
}

function isAnswerForRequiredField(
  fieldId: string,
  answer: LifestyleFieldAnswer,
): boolean {
  if (answer.fieldId !== fieldId) {
    return false;
  }

  if (Array.isArray(answer.value)) {
    return answer.value.length > 0;
  }

  return answer.value !== '' && answer.value !== null;
}

