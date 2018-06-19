// @flow
import React from 'react';
import AddStep from './AddStep';
import StepField from './StepField';
import { type Step } from 'types';
import { H2 } from 'components/typeset';
import Stack from './Stack';

type Props = {
  steps: Array<Step>,
  onPushStep({ text: string }): mixed,
  onSetStep({ id: string, text: string }): mixed,
  onMoveStep({ fromIndex: number, toIndex: number }): mixed,
};

export default ({ steps, onPushStep, onSetStep, onMoveStep }: Props) => (
  <div>
    <H2>Steps</H2>
    <Stack>
      {steps &&
        steps.map(step => (
          <StepField key={step.id} step={step} onChange={onSetStep} />
        ))}
      <AddStep onCreate={onPushStep} index={steps.length} />
    </Stack>
  </div>
);
