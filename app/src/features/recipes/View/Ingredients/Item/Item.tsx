import React, { FC, useState } from 'react';
import { toDisplay } from 'formatters/quantity';
import pluralize from 'pluralize';
import RangeHighlighter, { Range } from 'components/generic/RangeHighlighter';
import { Box, Checkbox } from '@material-ui/core';

export interface IngredientItemProps {
  servings: number;
  quantity?: number;
  quantityStart?: number;
  quantityEnd?: number;
  unit?: string;
  unitStart?: number;
  unitEnd?: number;
  food: any; // FIXME
  foodStart?: number;
  foodEnd?: number;
  text: string;
}

interface IngredientItemInternalProps extends IngredientItemProps {
  preferredServings?: number;
}

const IngredientItem: FC<IngredientItemInternalProps> = ({
  text,
  foodStart,
  foodEnd,
  unitStart,
  unitEnd,
  quantityStart,
  quantityEnd,
  servings,
  preferredServings,
  unit,
  quantity,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const renderQuantity = (valueText: string) => {
    if (!preferredServings) {
      return <b key={`value`}>{valueText}</b>;
    }

    return (
      <b key={`value`}>
        {toDisplay((preferredServings / servings) * quantity)}
      </b>
    );
  };

  const renderUnit = (unitText: string) => {
    if (servings === 1 && preferredServings && preferredServings > 1) {
      return <span key={`unit`}>{pluralize(unit)}</span>;
    }

    return <span key={`unit`}>{unitText}</span>;
  };

  const renderFood = (foodText: string) => {
    return <span key={`ingredient`}>{foodText}</span>;
  };

  const ranges: Range[] = [
    {
      name: 'food',
      start: foodStart,
      end: foodEnd,
      render: renderFood,
    },
    { name: 'unit', start: unitStart, end: unitEnd, render: renderUnit },
    {
      name: 'quantity',
      start: quantityStart,
      end: quantityEnd,
      render: renderQuantity,
    },
  ].sort((a, b) => b.start - a.start);

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Checkbox
        checked={isChecked}
        onChange={ev => setIsChecked(ev.target.checked)}
      />
      <RangeHighlighter text={text} ranges={ranges} />
    </Box>
  );
};

export default IngredientItem;
