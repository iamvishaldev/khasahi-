import {describe, beforeEach, it, expect} from '@jest/globals';
import React from 'react';
import TestRenderer, {act} from 'react-test-renderer';
import {useOnboardingStore} from '@/store/onboarding.store';
import {useOnboardingSteps} from './useOnboardingSteps';

function renderOnboardingSteps(): ReturnType<typeof useOnboardingSteps> {
  let captured: ReturnType<typeof useOnboardingSteps> | undefined;

  function Harness(): null {
    captured = useOnboardingSteps();
    return null;
  }

  let renderer: TestRenderer.ReactTestRenderer | undefined;
  act(() => {
    renderer = TestRenderer.create(React.createElement(Harness));
  });
  act(() => {
    renderer?.unmount();
  });

  if (!captured) {
    throw new Error('useOnboardingSteps did not run');
  }

  return captured;
}

describe('useOnboardingSteps', () => {
  beforeEach(() => {
    useOnboardingStore.getState().reset();
  });

  it('excludes the lifestyle-fields step for a profile with no extra fields', () => {
    useOnboardingStore.getState().setLifestyleProfile('general-user');

    const {steps, totalProgressSteps} = renderOnboardingSteps();

    expect(steps).toEqual([
      'welcome',
      'ai-intro',
      'lifestyle',
      'goals',
      'diet',
      'profile-ready',
    ]);
    expect(totalProgressSteps).toBe(4);
  });

  it('includes the lifestyle-fields step for a profile with extra fields (IT Professional)', () => {
    useOnboardingStore.getState().setLifestyleProfile('it-professional');

    const {steps, totalProgressSteps} = renderOnboardingSteps();

    expect(steps).toEqual([
      'welcome',
      'ai-intro',
      'lifestyle',
      'goals',
      'diet',
      'lifestyle-fields',
      'profile-ready',
    ]);
    expect(totalProgressSteps).toBe(5);
  });

  it('numbers progress steps starting after the excluded welcome step', () => {
    const {progressStepFor} = renderOnboardingSteps();

    expect(progressStepFor('ai-intro')).toBe(1);
    expect(progressStepFor('lifestyle')).toBe(2);
    expect(progressStepFor('goals')).toBe(3);
    expect(progressStepFor('diet')).toBe(4);
    expect(progressStepFor('lifestyle-fields')).toBe(5);
    expect(progressStepFor('welcome')).toBe(0);
  });
});
