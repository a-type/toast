import React, { FC, useState, useReducer } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  MenuList,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { FoodPicker } from 'features/foods/Picker';
import { camel } from 'change-case';
import { InlineLoader } from 'components/generic/Loader';
import { CheckCircleTwoTone } from '@material-ui/icons';

enum CorrectorActionType {
  SelectType,
  Submit,
  Result,
  Reset,
  Done,
}

type CorrectionType =
  | 'ChangeFood'
  | 'ChangeQuantity'
  | 'ChangeUnit'
  | 'Add'
  | 'Remove';

type CorrectorState = {
  correctionType: CorrectionType;
  stage: CorrectorActionType;
  loading: boolean;
  error?: Error;
  values?: any;
};

const correctorReducer = (state: CorrectorState, action): CorrectorState => {
  console.log(state, action);
  switch (action.type) {
    case CorrectorActionType.SelectType:
      return {
        ...state,
        correctionType: action.correctionType,
        stage: CorrectorActionType.Submit,
      };
    case CorrectorActionType.Submit:
      return {
        ...state,
        loading: true,
        stage: CorrectorActionType.Result,
      };
    case CorrectorActionType.Result:
      return {
        ...state,
        loading: false,
        error: action.error,
        stage: !!action.error
          ? CorrectorActionType.Submit
          : CorrectorActionType.Done,
      };
    case CorrectorActionType.Reset:
      return {
        loading: false,
        correctionType: 'ChangeFood',
        stage: CorrectorActionType.SelectType,
      };
  }
};

const useCorrectorState = (
  recipeId: string,
  ingredient: IngredientCorrectorIngredient,
  onComplete: () => any,
) => {
  const [state, dispatch] = useReducer(correctorReducer, {
    correctionType: 'ChangeFood',
    stage: CorrectorActionType.SelectType,
    loading: false,
  });

  const mutate = useMutation(SubmitIngredientCorrectionMutation);

  const typeSelectors = [
    'ChangeFood',
    'ChangeQuantity',
    'ChangeUnit',
    'Add',
    'Remove',
  ].reduce(
    (acc, type) => ({
      ...acc,
      [type]: () =>
        dispatch({
          type: CorrectorActionType.SelectType,
          correctionType: type,
        }),
    }),
    {},
  );

  const submit = async (values: any) => {
    try {
      dispatch({
        type: CorrectorActionType.Submit,
      });
      await mutate({
        variables: {
          input: {
            recipeId,
            [camel(state.correctionType)]: {
              ...(state.correctionType !== 'Add'
                ? { ingredientId: ingredient.id }
                : {}),
              ...values,
            },
          },
        },
      });
      dispatch({
        type: CorrectorActionType.Result,
      });
      setTimeout(() => {
        onComplete();
      }, 5000);
    } catch (err) {
      dispatch({
        type: CorrectorActionType.Result,
        error: err,
      });
    }
  };

  return { state, typeSelectors, submit };
};

export const SubmitIngredientCorrectionMutation = gql`
  mutation SubmitIngredientCorrection(
    $input: IngredientCorrectionSubmitInput!
  ) {
    submitIngredientCorrection(input: $input) {
      id
      status
    }
  }
`;

export type IngredientCorrectorIngredient = {
  id: string;
  text: string;
  unit: string;
  quantity: number;
  food: {
    id: string;
    name: string;
  };
};

export interface IngredientCorrectorProps {
  recipeId: string;
  ingredient: IngredientCorrectorIngredient;
  onComplete: () => any;
}

const useStyles = makeStyles(theme => ({
  heading: {
    marginBottom: theme.spacing(3),
  },
  field: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  doneIcon: {
    fontSize: '80px',
  },
}));

const IngredientCorrectorChangeFoodContents: FC<{
  onSubmit: any;
  value: any;
}> = ({ onSubmit, value }) => {
  const [food, setFood] = useState<{ id: string; name: string }>(value);
  const classes = useStyles({});

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <FoodPicker value={food} onChange={setFood} className={classes.field} />
      <Button onClick={() => onSubmit({ foodId: food.id })} disabled={!food}>
        Done
      </Button>
    </Box>
  );
};

const IngredientCorrectorChangeQuantityContents: FC<{
  onSubmit: any;
  value: number;
}> = ({ onSubmit, value }) => {
  const [quantity, setQuantity] = useState<number>(value);
  const classes = useStyles({});

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        value={quantity}
        onChange={ev => setQuantity(parseFloat(ev.target.value))}
        type="number"
        label="Quantity"
        className={classes.field}
        fullWidth
      />
      <Button onClick={() => onSubmit({ quantity })} disabled={!quantity}>
        Done
      </Button>
    </Box>
  );
};

const IngredientCorrectorChangeUnitContents: FC<{
  onSubmit: any;
  value: string;
}> = ({ onSubmit, value }) => {
  const [unit, setUnit] = useState<string>(value);
  const classes = useStyles({});

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      {/* TODO: autosuggest units */}
      <TextField
        value={unit}
        onChange={ev => setUnit(ev.target.value)}
        label="Unit"
        className={classes.field}
        fullWidth
      />
      <Button onClick={() => onSubmit({ unit })} disabled={!unit}>
        Done
      </Button>
    </Box>
  );
};

const IngredientCorrectorContents: FC<{
  recipeId: string;
  ingredient: IngredientCorrectorIngredient;
  onComplete: () => any;
}> = ({ ingredient, recipeId, onComplete }) => {
  const { state, typeSelectors, submit } = useCorrectorState(
    recipeId,
    ingredient,
    onComplete,
  );
  const classes = useStyles({});

  switch (state.stage) {
    case CorrectorActionType.Submit:
      switch (state.correctionType) {
        case 'ChangeFood':
          return (
            <IngredientCorrectorChangeFoodContents
              value={ingredient.food}
              onSubmit={submit}
            />
          );
        case 'ChangeQuantity':
          return (
            <IngredientCorrectorChangeQuantityContents
              value={ingredient.quantity}
              onSubmit={submit}
            />
          );
        case 'ChangeUnit':
          return (
            <IngredientCorrectorChangeUnitContents
              value={ingredient.unit}
              onSubmit={submit}
            />
          );
      }
    case CorrectorActionType.Result:
      return <InlineLoader />;
    case CorrectorActionType.Done:
      return (
        <Box display="flex" flexDirection="column" alignItems="center">
          <CheckCircleTwoTone color="secondary" className={classes.doneIcon} />
          <Typography>Thanks for making Toast better!</Typography>
        </Box>
      );
    default:
      return (
        <Box>
          <Typography variant="h6">
            What's wrong with the ingredient?
          </Typography>
          <MenuList>
            <MenuItem onClick={typeSelectors['ChangeFood']}>
              The food is wrong
            </MenuItem>
            <MenuItem onClick={typeSelectors['ChangeQuantity']}>
              The quantity is wrong
            </MenuItem>
            <MenuItem onClick={typeSelectors['ChangeUnit']}>
              The unit is wrong
            </MenuItem>
            <MenuItem onClick={typeSelectors['Remove']}>
              Remove this ingredient
            </MenuItem>
          </MenuList>
        </Box>
      );
  }
};

export const IngredientCorrector: FC<IngredientCorrectorProps> = ({
  recipeId,
  ingredient,
  onComplete,
}) => {
  const classes = useStyles({});

  return (
    <Box>
      <Box className={classes.heading}>
        <Typography variant="h4">Submit correction</Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          "{ingredient.text}"
        </Typography>
      </Box>
      <IngredientCorrectorContents
        ingredient={ingredient}
        recipeId={recipeId}
        onComplete={onComplete}
      />
    </Box>
  );
};
