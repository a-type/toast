import React from 'react';
import { Stack } from './components';
import { Provider } from './Context';
import Stage, { StageProps } from './Stage';

export interface StagesProps {
  stage: number;
  onStageChanged(newStage: number): void;
  completedStage?: number;
  children: React.ReactNode;
}

const Stages: React.SFC<StagesProps> & { Stage?: React.SFC<StageProps> } = ({
  stage,
  onStageChanged,
  completedStage,
  children,
}) => (
  <Provider
    stage={stage}
    onStageChanged={onStageChanged}
    completedStage={completedStage}
  >
    <Stack>{children}</Stack>
  </Provider>
);

Stages.Stage = Stage;

export default Stages;
