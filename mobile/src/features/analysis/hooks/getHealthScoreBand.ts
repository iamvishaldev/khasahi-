import {HealthScoreBand} from '../types/analysis.types';

export function getHealthScoreBand(value: number): {band: HealthScoreBand; label: string} {
  if (value >= 90) {
    return {band: 'excellent', label: 'Excellent'};
  }
  if (value >= 70) {
    return {band: 'good', label: 'Good'};
  }
  if (value >= 50) {
    return {band: 'moderate', label: 'Moderate'};
  }
  return {band: 'needsImprovement', label: 'Needs Improvement'};
}
