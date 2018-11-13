import * as React from 'react';

const Wave = ({ yPosition }) => {
  const d = [`M ${0} ${yPosition}`];
  d.push(`c 1 5 3 2 1 5`);
  d.push(`c 1 -3 3 -2 1`);

  return <path d={} />;
};
