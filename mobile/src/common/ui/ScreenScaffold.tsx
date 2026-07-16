import React from 'react';
import {ScreenContainer} from '@/components/layout/ScreenContainer';
import {AppText} from '@/components/typography/AppText';
import {InfoCard} from '@/components/feedback/InfoCard';

type ScreenScaffoldProps = {
  title: string;
  description: string;
};

export function ScreenScaffold({
  title,
  description,
}: ScreenScaffoldProps): React.JSX.Element {
  return (
    <ScreenContainer scrollable>
      <AppText variant="display">{title}</AppText>
      <InfoCard>
        <AppText>{description}</AppText>
      </InfoCard>
    </ScreenContainer>
  );
}

