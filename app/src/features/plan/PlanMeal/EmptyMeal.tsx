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
import { PlanActionType } from './types';

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
  planDayId: string;
  mealName: string;
}

export const EmptyMeal: FC<EmptyMealProps> = ({ planDayId, mealName }) => {
  const [
    { stage, actionType },
    { begin, cancel, selectActionType },
  ] = usePlanActionSelection();

  return (
    <>
      <Border
        onClick={() => {
          // normally we'd call begin() here, but
          // until we actually have previous meal assignment ready, we can skip
          // to recipe assign instead
          selectActionType(PlanActionType.Cook);
        }}
      >
        <Icon name="add" size="32px" color="var(--color-brand-dark)" />
      </Border>
      {stage !== SelectionStage.Initial && (
        <Popup onClose={cancel}>
          {stage === SelectionStage.Action ? (
            <PlanMealActionPicker onActionSelected={selectActionType} />
          ) : (
            <PlanMealDetailsStage
              planDayId={planDayId}
              mealName={mealName}
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
