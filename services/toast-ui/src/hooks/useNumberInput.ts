import { useState, useCallback, ChangeEvent, HTMLAttributes } from 'react';

export default (initialValue: number = 0): [number, any] => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const val = ev.target.value;
    const asFloat = parseFloat(val);
    setValue(asFloat);
  }, []);

  return [
    value,
    {
      onChange,
      value: `${value}`,
      type: 'number',
    },
  ];
};
