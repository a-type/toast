import React from 'react';
import Units from './Units';
import Ingredient from './Ingredient';
import Note from './Note';
import { toDisplay } from 'formatters/unitValue';
import IngredientLink from 'components/ingredients/Link';

export default ({ text, ingredient, ingredientTextMatch }) => {
  if (ingredientTextMatch) {
    const outerParts = text.split(ingredientTextMatch);

    return (
      <li>
        {outerParts[0]}
        <IngredientLink ingredient={ingredient}>
          {ingredientTextMatch}
        </IngredientLink>
        {outerParts[1]}
      </li>
    );
  }

  return <li>{text}</li>;
};
