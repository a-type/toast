import * as React from 'react';
import RangeHighlighter, { Range } from 'components/generic/RangeHighlighter';
import {
  ListRecipeIngredientCorrections,
  CorrectionType,
} from 'generated/schema';
import { Ingredient, Unit, Value } from './components';
import { Button } from 'components/generic';
import { pathOr } from 'ramda';

export interface ManageRecipeIngredientCorrectionsCorrectionProps {
  correction: ListRecipeIngredientCorrections.RecipeIngredientCorrections;
  accept(id: string): void;
  reject(id: string): void;
}

const Correction: React.SFC<
  ManageRecipeIngredientCorrectionsCorrectionProps
> = ({ correction, accept, reject }) => {
  if (correction.correctionType === CorrectionType.Delete) {
    return (
      <div>
        <div>Delete?</div>
        <Button.Positive onClick={() => accept(correction.id)}>
          Accept
        </Button.Positive>
        <Button.Negative onClick={() => reject(correction.id)}>
          Reject
        </Button.Negative>
      </div>
    );
  }

  const ranges: Range[] = [
    {
      name: 'ingredient',
      start: correction.correctedValue.ingredientStart,
      end: correction.correctedValue.ingredientEnd,
      render: text => <Ingredient>{text}</Ingredient>,
    },
    {
      name: 'unit',
      start: correction.correctedValue.unitStart,
      end: correction.correctedValue.unitEnd,
      render: text => <Unit>{text}</Unit>,
    },
    {
      name: 'value',
      start: correction.correctedValue.valueStart,
      end: correction.correctedValue.valueEnd,
      render: text => <Value>{text}</Value>,
    },
  ];

  return (
    <div>
      <RangeHighlighter
        text={pathOr('Blank', ['correctedValue', 'text'], correction)}
        ranges={ranges}
      />
      <ul>
        <li>
          <label>Ingredient:</label>{' '}
          <Ingredient>
            {pathOr(
              'None',
              ['correctedValue', 'ingredient', 'name'],
              correction,
            )}
          </Ingredient>
        </li>
        <li>
          <label>Unit:</label>{' '}
          <Unit>{pathOr('None', ['correctedValue', 'unit'], correction)}</Unit>
        </li>
        <li>
          <label>Value:</label>{' '}
          <Value>
            {pathOr('None', ['correctedValue', 'value'], correction)}
          </Value>
        </li>
      </ul>
      <div>
        <Button.Positive onClick={() => accept(correction.id)}>
          Accept
        </Button.Positive>
        <Button.Negative onClick={() => reject(correction.id)}>
          Reject
        </Button.Negative>
      </div>
    </div>
  );
};

export default Correction;
