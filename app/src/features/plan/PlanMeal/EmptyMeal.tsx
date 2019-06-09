import React, { FC } from 'react';
import PlanMealActionPicker from './ActionPicker';
import usePlanActionSelection, {
  SelectionStage,
} from './usePlanActionSelection';
import PlanMealDetailsStage from './DetailsStage';
import {
  Dialog,
  Card,
  CardActionArea,
  Box,
  makeStyles,
} from '@material-ui/core';
import { AddCircleTwoTone } from '@material-ui/icons';
import { darken } from '@material-ui/core/styles';
import { PlanActionType } from './types';
import Popup from 'components/generic/Popup';

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    color: darken(theme.palette.primary.dark, 0.5),
  },
  cardActionArea: {
    height: '100%',
  },
  addIcon: {
    margin: 'auto',
    fontSize: '3.75rem',
  },
}));

interface EmptyMealProps {
  planDayId: string;
  mealName: string;
}

export const EmptyMeal: FC<EmptyMealProps> = ({
  planDayId,
  mealName,
  ...rest
}) => {
  const [
    { stage, actionType },
    { cancel, selectActionType },
  ] = usePlanActionSelection();
  const classes = useStyles(rest);

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea
          className={classes.cardActionArea}
          onClick={() => selectActionType(PlanActionType.Cook)}
        >
          <Box display="flex" flexDirection="column" height="100%">
            <AddCircleTwoTone className={classes.addIcon} />
          </Box>
        </CardActionArea>
      </Card>
      <Popup
        open={stage !== SelectionStage.Initial}
        title="Select a recipe"
        onClose={cancel}
      >
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
    </>
  );
};

export default EmptyMeal;
