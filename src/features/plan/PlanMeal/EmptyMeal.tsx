import React, { FC } from 'react';
import styled from 'styled-components';
import { Icon, Popup } from 'components/generic';
import PlanMealActionPicker from './ActionPicker';
import { hoverBorder, focusShadow } from 'theme';
import usePlanActionSelection, {
  SelectionStage,
} from './usePlanActionSelection';
import PlanMealDetailsStage from './DetailsStage';
import { PlanMealData } from '../types';

const Border = styled<{}, 'button'>('button')`
  border-radius: var(--border-radius-lg);
  background: var(--color-brand);
  color: var(--color-dark);
  display: flex;
  outline: 0;
  border: 0;
  cursor: pointer;

  & > * {
    margin: auto;
  }

  ${hoverBorder.default}

  ${focusShadow.default}
`;

interface EmptyMealProps {
  meal: PlanMealData;
}

export const EmptyMeal: FC<EmptyMealProps> = ({ meal }) => {
  const [
    { stage, actionType },
    { begin, cancel, selectActionType },
  ] = usePlanActionSelection();

  return (
    <>
      <Border onClick={begin}>
        <Icon name="plus-math" size="32px" color="var(--color-brand-dark)" />
      </Border>
      {stage !== SelectionStage.Initial && (
        <Popup onClose={cancel}>
          {stage === SelectionStage.Action ? (
            <PlanMealActionPicker onActionSelected={selectActionType} />
          ) : (
            <PlanMealDetailsStage
              meal={meal}
              actionType={actionType}
              onCancel={cancel}
              onDone={cancel}
            />
          )}
        </Popup>
      )}
    </>
  );
};

export default EmptyMeal;
