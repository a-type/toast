import React, { createContext, useState, useContext } from 'react';

interface LinkerResult {
  recipe: any;
  problems: any;
}

interface LinkerContextValue {
  open: boolean;
  working: boolean;
  error: Error;
  lastResult: LinkerResult;
  setOpen(open: boolean): void;
  setWorking(working: boolean): void;
  setError(err: Error): void;
  setLastResult(res: { problems: any; recipe: any }): void;
  reset(): void;
}

const LinkerContext = createContext<LinkerContextValue>({
  open: false,
  working: false,
  error: null,
  lastResult: null,
  setOpen() {},
  setWorking() {},
  setError() {},
  setLastResult() {},
  reset() {},
});

export default LinkerContext;

export const Provider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error>(null);
  const [lastResult, setLastResult] = useState<{ recipe: any; problems: any }>(
    null,
  );

  const reset = () => {
    setError(null);
    setWorking(false);
    setLastResult(null);
    setOpen(false);
  };

  return (
    <LinkerContext.Provider
      value={{
        open,
        working,
        error,
        lastResult,
        setOpen,
        setWorking,
        setError,
        setLastResult,
        reset,
      }}
    >
      {children}
    </LinkerContext.Provider>
  );
};

export const Consumer = LinkerContext.Consumer;

export const useLinker = () => {
  const {
    open,
    working,
    error,
    lastResult,
    setOpen,
    setWorking,
    setError,
    setLastResult,
    reset,
  } = useContext(LinkerContext);

  const handleStarted = () => {
    setWorking(true);
    setOpen(false);
    setLastResult(null);
  };

  const handleComplete = (res: LinkerResult) => {
    setWorking(false);
    setOpen(true);
    setLastResult(res);
  };

  const handleFailed = err => {
    setError(err);
    setWorking(false);
    setOpen(true);
  };

  return {
    open,
    working,
    error,
    lastResult,
    setOpen,
    setWorking,
    setLastResult,
    setError,
    reset,
    handleStarted,
    handleComplete,
    handleFailed,
  };
};
