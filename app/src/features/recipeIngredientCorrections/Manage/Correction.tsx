import * as React from 'react';
import RangeHighlighter, { Range } from 'components/generic/RangeHighlighter';
import { Ingredient, Unit, Value } from './components';
import { Button } from 'grommet';
import { pathOr } from 'ramda';

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

const Correction: React.SFC<
  ManageRecipeIngredientCorrectionsCorrectionProps
> = ({ correction, accept, reject }) => {
  if (correction.correctionType === CorrectionType.Delete) {
    return (
      <div>
        <div>Delete?</div>
        <Button
          color="status-error"
          onClick={() => accept(correction.id)}
          label="Accept"
        />
        <Button onClick={() => reject(correction.id)} label="Reject" />
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
      name: 'quantity',
      start: correction.correctedValue.quantityStart,
      end: correction.correctedValue.quantityEnd,
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
          <label>Quantity:</label>{' '}
          <Value>
            {pathOr('None', ['correctedValue', 'quantity'], correction)}
          </Value>
        </li>
      </ul>
      <div>
        <Button
          color="status-ok"
          onClick={() => accept(correction.id)}
          label="Accept"
        />
        <Button
          color="status-error"
          onClick={() => reject(correction.id)}
          label="Reject"
        />
      </div>
    </div>
  );
};

export default Correction;
