import * as React from 'react';
import { cold } from 'react-hot-loader';
import { GetShoppingList } from 'generated/schema';
import { Checkbox } from 'components/generic';
import { Layout } from './components';
import { formatIngredient } from 'formatters';
import { HelpText, Link } from 'components/typeset';

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
      <HelpText>
        from:{' '}
        {recipes.map(recipe => (
          <span>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>{' '}
          </span>
        ))}
      </HelpText>
    </Layout>
  );
};

export default cold(ShoppingListIngredient);
