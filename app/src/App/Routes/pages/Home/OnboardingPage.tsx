import React, { FC } from 'react';
import Column from 'components/layout/Column';
import { PlanSetup } from 'features/plan/Setup/Setup';

interface OnboardingPageProps {
  onCreated(): void;
}

export const OnboardingPage: FC<OnboardingPageProps> = ({ onCreated }) => (
  <Column>
    <PlanSetup onCreated={onCreated} />
  </Column>
);

export default OnboardingPage;
