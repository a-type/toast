import React from 'react';
import { Paragraph } from 'grommet';

export default ({ steps }) => (
  <ol css={{ margin: 'var(--spacing-md)', fontSize: 'var(--font-size-lg)' }}>
    {steps.map((text, index) => (
      <li key={index}>
        <Paragraph size="large">{text}</Paragraph>
      </li>
    ))}
  </ol>
);
