import React, { FC, useState } from 'react';
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Button,
  Dialog,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ExpandMoreTwoTone } from '@material-ui/icons';
import { IngredientCorrector } from './Corrector';
import { Row } from 'components/generic/Row';

export type IngredientDisplayIngredientFood = {
  id: string;
  name: string;
};

export type IngredientDisplayIngredient = {
  id: string;
  text: string;
  unit: string;
  unitStart: number;
  unitEnd: number;
  quantity: number;
  quantityStart: number;
  quantityEnd: number;
  food: IngredientDisplayIngredientFood;
  foodStart: number;
  foodEnd: number;
};

export interface IngredientDisplayProps {
  ingredient: IngredientDisplayIngredient;
  recipeId: string;
}

const useStyles = makeStyles<Theme, { expanded: boolean }>(theme => ({
  dialogContent: {
    minWidth: '400px',
    maxWidth: '90vw',
  },
  border: props => ({
    backgroundColor: props.expanded ? theme.palette.grey[50] : 'transparent',
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }),
}));

export const IngredientDisplay: FC<IngredientDisplayProps> = ({
  ingredient,
  recipeId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showCorrector, setShowCorrector] = useState(false);
  const classes = useStyles({ expanded });

  return (
    <Box display="flex" flexDirection="column" className={classes.border}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>{ingredient.text}</Typography>
        <IconButton onClick={() => setExpanded(!expanded)}>
          <ExpandMoreTwoTone
            style={{ transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
          />
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Row alignItems="center">
          <Typography>
            Food: {ingredient.food ? ingredient.food.name : 'Unknown'}
          </Typography>
          <Button variant="text" onClick={() => setShowCorrector(true)}>
            Suggest a change
          </Button>
        </Row>
      </Collapse>
      <Dialog open={showCorrector} onClose={() => setShowCorrector(false)}>
        <Box p={3} className={classes.dialogContent}>
          <IngredientCorrector
            ingredient={ingredient}
            recipeId={recipeId}
            onComplete={() => setShowCorrector(false)}
          />
        </Box>
      </Dialog>
    </Box>
  );
};
