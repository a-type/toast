// @flow
import React from 'react';
import List from './List';
import { type RecipeStep } from 'types';

export default ({ steps }: { steps: Array<RecipeStep> }) => (
  <List>
    {steps.map(({ index, step: { id, text } }) => (
      <li key={id}>
        {index ? index + 1 : 1}. {text}
      </li>
    ))}
  </List>
);
