import { useState, useEffect } from 'react';

export type FlagName = 'onboarding';

export default (flagName: FlagName): [boolean, (value: boolean) => void] => {
  const [flagValue, setFlagValue] = useState(false);
  useEffect(() => {
    const val = localStorage.getItem(flagName);
    setFlagValue(!!val);
  });

  const setFlag = (value: boolean) => {
    setFlagValue(value);
    if (value) {
      localStorage.setItem(flagName, 'true');
    } else {
      localStorage.removeItem(flagName);
    }
  };

  return [flagValue, setFlag];
};
