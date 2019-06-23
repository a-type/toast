import React from 'react';
import { Typography } from '@material-ui/core';

export default ({ steps }) => (
  <ol css={{ margin: 'var(--spacing-md)', fontSize: 'var(--font-size-lg)' }}>
    {steps.map((text, index) => (
      <li key={index}>
        <Typography>{text}</Typography>
      </li>
    ))}
  </ol>
);
