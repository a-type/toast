import React, { FC } from 'react';
import { PlanActionType } from './types';
import { Button, Box } from 'grommet';

export interface PlanMealActionPickerProps {
  onActionSelected(actionType: PlanActionType): void;
}

export const PlanMealActionPicker: FC<PlanMealActionPickerProps> = ({
  onActionSelected,
}) => {
  return (
    <Box>
      <Button
        onClick={() => onActionSelected(PlanActionType.Cook)}
        label="Cook"
      />
    </Box>
  );
};

export default PlanMealActionPicker;
