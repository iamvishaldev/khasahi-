import {LifestyleProfileDefinition} from '@shared/index';

export const lifestyleProfiles: LifestyleProfileDefinition[] = [
  {
    id: 'general-user',
    label: 'General User',
    description: 'Balanced default profile for everyday packaged food decisions.',
    aiContextLabel: 'General User',
    fields: [],
  },
  {
    id: 'student',
    label: 'Student',
    description: 'Optimized for study routines, energy management, and convenience foods.',
    aiContextLabel: 'Student',
    fields: [],
  },
  {
    id: 'it-professional',
    label: 'IT Professional',
    description: 'Designed for desk-heavy work routines, long sitting hours, and shift-driven lifestyle decisions.',
    aiContextLabel: 'IT Professional',
    fields: [
      {
        id: 'work-style',
        label: 'Work Style',
        inputType: 'single-select',
        required: true,
        options: [
          {id: 'remote', label: 'Remote'},
          {id: 'hybrid', label: 'Hybrid'},
          {id: 'office', label: 'Office'},
        ],
      },
      {
        id: 'daily-sitting-hours',
        label: 'Daily Sitting Hours',
        inputType: 'single-select',
        required: true,
        options: [
          {id: 'under-4', label: 'Less than 4 hours'},
          {id: '4-to-8', label: '4-8 hours'},
          {id: 'over-8', label: 'More than 8 hours'},
        ],
      },
      {
        id: 'work-schedule',
        label: 'Typical Work Schedule',
        inputType: 'single-select',
        required: true,
        options: [
          {id: 'day-shift', label: 'Day Shift'},
          {id: 'night-shift', label: 'Night Shift'},
          {id: 'rotating-shift', label: 'Rotating Shift'},
        ],
      },
    ],
  },
  {
    id: 'fitness-enthusiast',
    label: 'Fitness Enthusiast',
    description: 'Designed for active users balancing performance, recovery, and body composition goals.',
    aiContextLabel: 'Fitness Enthusiast',
    fields: [],
  },
  {
    id: 'parent',
    label: 'Parent',
    description: 'Designed for family-first purchase decisions and label clarity under time pressure.',
    aiContextLabel: 'Parent',
    fields: [],
  },
  {
    id: 'senior-citizen',
    label: 'Senior Citizen',
    description: 'Designed for age-aware nutrition explanations and conservative food guidance.',
    aiContextLabel: 'Senior Citizen',
    fields: [],
  },
];

export function findLifestyleProfile(
  profileId: LifestyleProfileDefinition['id'],
): LifestyleProfileDefinition | undefined {
  return lifestyleProfiles.find(profile => profile.id === profileId);
}

