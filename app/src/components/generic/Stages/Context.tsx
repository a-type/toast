import React, { createContext } from 'react';

const { Provider: _Provider, Consumer: _Consumer } = createContext({
  stage: 0,
  completedStage: -1,
  onStageChanged: (stageIndex: number) => null,
});

export const Provider = ({
  stage,
  onStageChanged,
  completedStage,
  children,
}) => (
  <_Provider value={{ stage, onStageChanged, completedStage }}>
    {children}
  </_Provider>
);

export const Consumer = _Consumer;
