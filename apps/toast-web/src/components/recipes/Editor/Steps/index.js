// @flow
import React from 'react';
import AddStep from './AddStep';
import StepField from './StepField';
import { type Step } from 'types';
import { H2 } from 'components/typeset';
import Stack from './Stack';

type Props = {
  steps: Array<Step>,
  recipeId: string,
};

export default ({ steps, recipeId }: Props) => (
  <div>
    <H2>Steps</H2>
    <Stack>
      {steps && steps.map(step => <StepField key={step.id} step={step} />)}
      <AddStep index={steps.length} recipeId={recipeId} />
    </Stack>
  </div>
);
