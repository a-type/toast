import * as React from 'react';
import { cold } from 'react-hot-loader';
import { ShoppingListView } from 'generated/schema';
import { Checkbox } from 'components/generic';
import { GlobalLoader } from 'components/generic/Loader';
import { formatIngredient } from 'formatters';
import MarkPurchasedMutation from './MarkPurchasedMutation';
import logger from 'logger';

export interface ShoppingListIngredientProps {
  totalValue: number;
  unit?: string;
  ingredient: ShoppingListView.Ingredient;
  purchasedValue: number;
}

const ShoppingListIngredient: React.SFC<ShoppingListIngredientProps> = ({
  totalValue,
  unit,
  ingredient,
  purchasedValue,
}) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <MarkPurchasedMutation
      variables={{ ingredientId: ingredient.id, unit, value: totalValue }}
    >
      {mutate => (
        <Checkbox
          value="done"
          checked={purchasedValue >= totalValue}
          onChange={async () => {
            setLoading(true);
            try {
              await mutate();
            } catch (err) {
              logger.fatal(err);
            } finally {
              setLoading(false);
            }
          }}
          data-grid-area="checkbox"
        >
          {formatIngredient(totalValue, unit || '', ingredient.name)}{' '}
          {loading && <GlobalLoader />}
        </Checkbox>
      )}
    </MarkPurchasedMutation>
  );
};

export default cold(ShoppingListIngredient);
