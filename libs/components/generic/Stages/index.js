import React from 'react';
import { Stack } from './components';
import { Provider } from './Context';
import Stage from './Stage';

const Stages = ({ stage, onStageChanged, completedStage, children }) => (
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
