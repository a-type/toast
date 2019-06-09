import React, { FC, useState } from 'react';
import {
  IngredientCorrectionForm,
  IngredientCorrectionFormMessages,
} from './CorrectionForm';
import { toDisplay } from 'formatters/quantity';
import {
  IngredientCorrectorIngredient,
  IngredientCorrectedFieldsInput,
} from 'features/recipes/Correct/types';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Button,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { MoreVertTwoTone } from '@material-ui/icons';

export type IngredientCorrectorMessages = IngredientCorrectionFormMessages & {
  correctionSubmitted: string;
  suggestChange: string;
  suggestDelete: string;
};

interface IngredientCorrectorProps {
  ingredient: IngredientCorrectorIngredient;
  submit(
    id: string,
    correction: IngredientCorrectedFieldsInput,
    text: string,
  ): void;
  requestDelete(id: string): void;
  messages?: IngredientCorrectorMessages;
}

export const DEFAULT_MESSAGES: IngredientCorrectorMessages = {
  submitCorrection: 'Submit correction',
  correctionSubmitted: 'Correction submitted',
  suggestChange: 'Suggest change',
  suggestDelete: 'Suggest delete',
};

const useStyles = makeStyles(theme => ({
  badText: {
    color: theme.palette.error.dark,
  },
}));

const IngredientCorrector: FC<IngredientCorrectorProps> = ({
  ingredient,
  submit,
  requestDelete,
  messages = DEFAULT_MESSAGES,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = useState(null);

  if (!showForm) {
    return (
      <Box display="flex" flexDirection="row" width="100%" mb={2}>
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          alignContent="stretch"
        >
          <Typography gutterBottom>{ingredient.text}</Typography>
          <Typography gutterBottom>
            <Typography variant="caption">
              Quantity: {toDisplay(ingredient.quantity)}, Unit:{' '}
              {ingredient.unit || <span className={classes.badText}>None</span>}
              , Ingredient:{' '}
              {ingredient.food ? (
                ingredient.food.name
              ) : (
                <span className={classes.badText}>Unknown</span>
              )}
            </Typography>
          </Typography>
        </Box>
        <Box justifyContent="center">
          {hasSubmitted ? (
            <Typography>{messages.correctionSubmitted}</Typography>
          ) : (
            <>
              <IconButton
                onClick={ev => {
                  setAnchorEl(ev.currentTarget);
                  setMenuOpen(true);
                }}
                aria-controls="correction-menu"
                aria-haspopup
              >
                <MoreVertTwoTone />
              </IconButton>
              <Menu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                anchorEl={anchorEl}
                id="correction-menu"
              >
                <MenuItem onClick={() => setShowForm(true)}>
                  {messages.suggestChange}
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    await requestDelete(ingredient.id);
                    setHasSubmitted(true);
                  }}
                >
                  {messages.suggestDelete}
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Box>
    );
  }

  const handleSubmit = (values: IngredientCorrectorIngredient) => {
    submit(
      ingredient.id,
      {
        unit: values.unit,
        quantity: values.quantity,
        foodId: values.food.id,
        unitStart: values.unitStart,
        unitEnd: values.unitEnd,
        quantityStart: values.quantityStart,
        quantityEnd: values.quantityEnd,
        foodStart: values.foodStart,
        foodEnd: values.foodEnd,
      },
      values.text,
    );
  };

  return (
    <IngredientCorrectionForm
      initialValue={ingredient}
      onSubmit={async data => {
        await handleSubmit(data);
        setShowForm(false);
        setHasSubmitted(true);
      }}
      onCancel={() => setShowForm(false)}
      messages={{
        submitCorrection: messages.submitCorrection,
      }}
    />
  );
};

export default IngredientCorrector;
