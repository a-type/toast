import React from 'react';
import { Stack } from './components';
import { Provider } from './Context';
import Stage from './Stage';

const Stages = ({ stage, onStageChanged, children }) => (
  <Provider stage={stage} onStageChanged={onStageChanged}>
    <Stack>{children}</Stack>
  </Provider>
);

Stages.Stage = Stage;

export default Stages;
