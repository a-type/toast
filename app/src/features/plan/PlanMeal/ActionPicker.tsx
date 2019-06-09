import React, { FC } from 'react';
import { PlanActionType } from './types';
import { Box, Button } from '@material-ui/core';

export interface PlanMealActionPickerProps {
  onActionSelected(actionType: PlanActionType): void;
}

export const PlanMealActionPicker: FC<PlanMealActionPickerProps> = ({
  onActionSelected,
}) => {
  return (
    <Box>
      <Button onClick={() => onActionSelected(PlanActionType.Cook)}>
        Cook
      </Button>
    </Box>
  );
};

export default PlanMealActionPicker;
