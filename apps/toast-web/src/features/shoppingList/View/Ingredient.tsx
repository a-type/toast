import * as React from 'react';
import { cold } from 'react-hot-loader';
import { GetShoppingList } from 'generated/schema';
import { Checkbox } from 'components/generic';
import { Layout } from './components';
import { formatIngredient } from 'formatters';

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
    <Layout>
      <Checkbox
        value="done"
        checked={done}
        onChange={ev => setDone(ev.target.checked)}
      />
      <div>{formatIngredient(totalValue, unit || '', ingredient.name)}</div>
      <div>
        [
        {recipes.map(recipe => (
          <span key={recipe.id}>{recipe.title}, </span>
        ))}
        ]
      </div>
    </Layout>
  );
};

export default cold(ShoppingListIngredient);
