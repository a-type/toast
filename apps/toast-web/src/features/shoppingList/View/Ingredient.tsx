import * as React from 'react';
import { cold } from 'react-hot-loader';
import { GetShoppingList } from 'generated/schema';

export interface ShoppingListIngredientProps {
  totalValue: number;
  unit?: string;
  ingredient: GetShoppingList.Ingredient;
  recipes: GetShoppingList.Recipes[];
}

const ShoppingListIngredient: React.SFC<ShoppingListIngredientProps> = ({
  totalValue,
  unit,
  ingredient,
  recipes,
}) => {
  const [done, setDone] = React.useState(false);

  return (
    <div>
      <input
        type="checkbox"
        value="done"
        checked={done}
        onChange={ev => setDone(ev.target.checked)}
      />
      <div>
        {totalValue} {unit}
      </div>
      <div>{ingredient.name}</div>
      <div>
        [
        {recipes.map(recipe => (
          <span key={recipe.id}>{recipe.title}, </span>
        ))}
        ]
      </div>
    </div>
  );
};

export default cold(ShoppingListIngredient);
