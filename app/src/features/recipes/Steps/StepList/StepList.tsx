import React from 'react';
import { Paragraph } from 'grommet';

export default ({ steps }) => (
  <ol css={{ margin: 'var(--spacing-md)', fontSize: 'var(--font-size-lg)' }}>
    {steps.map(({ id, index, text }) => (
      <li key={id}>
        <Paragraph size="large">{text}</Paragraph>
      </li>
    ))}
  </ol>
);
