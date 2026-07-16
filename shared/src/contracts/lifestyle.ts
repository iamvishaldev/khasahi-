export type LifestyleProfileId =
  | 'general-user'
  | 'student'
  | 'it-professional'
  | 'fitness-enthusiast'
  | 'parent'
  | 'senior-citizen';

export type LifestyleFieldInputType =
  | 'single-select'
  | 'multi-select'
  | 'number'
  | 'text';

export interface LifestyleFieldOption {
  id: string;
  label: string;
}

export interface LifestyleFieldDefinition {
  id: string;
  label: string;
  inputType: LifestyleFieldInputType;
  required: boolean;
  options?: LifestyleFieldOption[];
}

export interface LifestyleProfileDefinition {
  id: LifestyleProfileId;
  label: string;
  description: string;
  aiContextLabel: string;
  fields: LifestyleFieldDefinition[];
}

export interface LifestyleFieldAnswer {
  fieldId: string;
  value: string | number | string[];
}

export interface LifestyleSelection {
  profileId: LifestyleProfileId;
  answers: LifestyleFieldAnswer[];
}

