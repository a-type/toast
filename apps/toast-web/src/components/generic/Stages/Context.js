import React, { createContext } from 'react';

const { Provider: _Provider, Consumer: _Consumer } = createContext({
  stage: 0,
  onStageChanged: () => null,
});

export const Provider = ({ stage, onStageChanged, children }) => (
  <_Provider value={{ stage, onStageChanged }}>{children}</_Provider>
);

export const Consumer = _Consumer;
