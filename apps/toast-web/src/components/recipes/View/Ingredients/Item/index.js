import React from 'react';
import Units from './Units';
import Ingredient from './Ingredient';
import { toDisplay } from 'formatters/unitValue';

const displayUnits = (unit, unitValue) => {
  if (!unit || unit === 'count') {
    return unitValue;
  }

  return `${toDisplay(unitValue)} ${unit}${unitValue > 1 ? 's' : ''}`;
};

export default ({ unit, unitValue, name }) => (
  <React.Fragment>
    <Units>{displayUnits(unit, unitValue)}</Units>
    <Ingredient>{name}</Ingredient>
  </React.Fragment>
);
