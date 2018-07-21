import React from 'react';
import Units from './Units';
import Ingredient from './Ingredient';
import Note from './Note';
import { toDisplay } from 'formatters/unitValue';

const displayUnits = (unit, unitValue) => {
  if (!unit || unit === 'count') {
    return unitValue;
  }

  return `${toDisplay(unitValue)} ${unit}${unitValue > 1 ? 's' : ''}`;
};

export default ({ unit, unitValue, name, note }) => (
  <React.Fragment>
    <Units>{displayUnits(unit, unitValue)}</Units>
    <Ingredient>{name}</Ingredient>
    {note && <Note>{note}</Note>}
  </React.Fragment>
);
