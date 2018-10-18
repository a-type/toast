import React from 'react';
import List from './List';

export default ({ steps }) => (
  <List>
    {steps.map(({ index, step: { id, text } }) => (
      <li key={id}>
        {index ? index + 1 : 1}. {text}
      </li>
    ))}
  </List>
);
