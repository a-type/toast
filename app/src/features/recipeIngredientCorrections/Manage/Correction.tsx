import * as React from 'react';
import RangeHighlighter, { Range } from 'components/generic/RangeHighlighter';
import { Ingredient, Unit, Value } from './components';
import { pathOr } from 'ramda';
import { Button, Paper, makeStyles } from '@material-ui/core';

enum CorrectionType {
  Delete = 'Delete',
  Change = 'Change',
  Add = 'Add',
}

export interface ManageRecipeIngredientCorrectionsCorrectionProps {
  correction: any;
  accept(id: string): void;
  reject(id: string): void;
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Correction: React.SFC<
  ManageRecipeIngredientCorrectionsCorrectionProps
> = ({ correction, accept, reject }) => {
  const classes = useStyles({});

  if (correction.correctionType === CorrectionType.Delete) {
    return (
      <Paper className={classes.paper}>
        <div>Delete?</div>
        <Button
          className={classes.button}
          onClick={() => accept(correction.id)}
        >
          Accept
        </Button>
        <Button
          className={classes.button}
          onClick={() => reject(correction.id)}
        >
          Reject
        </Button>
      </Paper>
    );
  }

  if (correction.correctedText && !correction.correctedFields) {
    return (
      <Paper className={classes.paper}>
        <div>Corrected text: "{correction.correctedText}"</div>
        <div>The ingredient will be reparsed from this text</div>
        <Button
          className={classes.button}
          onClick={() => accept(correction.id)}
        >
          Accept
        </Button>
        <Button
          className={classes.button}
          onClick={() => reject(correction.id)}
        >
          Reject
        </Button>
      </Paper>
    );
  }

  const ranges: Range[] = [
    {
      name: 'ingredient',
      start: correction.correctedFields.foodStart,
      end: correction.correctedFields.foodEnd,
      render: text => <Ingredient>{text}</Ingredient>,
    },
    {
      name: 'unit',
      start: correction.correctedFields.unitStart,
      end: correction.correctedFields.unitEnd,
      render: text => <Unit>{text}</Unit>,
    },
    {
      name: 'quantity',
      start: correction.correctedFields.quantityStart,
      end: correction.correctedFields.quantityEnd,
      render: text => <Value>{text}</Value>,
    },
  ];

  return (
    <Paper className={classes.paper}>
      <RangeHighlighter
        text={pathOr('Blank', ['correctedFields', 'text'], correction)}
        ranges={ranges}
      />
      <ul>
        <li>
          <label>Food:</label>{' '}
          <Ingredient>
            {pathOr('None', ['correctedFields', 'food', 'name'], correction)}
          </Ingredient>
        </li>
        <li>
          <label>Unit:</label>{' '}
          <Unit>{pathOr('None', ['correctedFields', 'unit'], correction)}</Unit>
        </li>
        <li>
          <label>Quantity:</label>{' '}
          <Value>
            {pathOr('None', ['correctedFields', 'quantity'], correction)}
          </Value>
        </li>
      </ul>
      <div>
        <Button
          className={classes.button}
          color="primary"
          onClick={() => accept(correction.id)}
        >
          Accept
        </Button>
        <Button
          className={classes.button}
          onClick={() => reject(correction.id)}
        >
          Reject
        </Button>
      </div>
    </Paper>
  );
};

export default Correction;
