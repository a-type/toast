// @flow
import React from 'react';
import Item from './Item';
import List from './List';
import Label from './Label';
import Layout from './Layout';
import IngredientPicker from 'components/ingredients/Picker';
import { type Ingredient } from 'types';

type Props = {
  ingredients: {
    include: Array<Ingredient>,
    exclude: Array<Ingredient>,
  },
  includeIngredient(ingredient: Ingredient): any,
  excludeIngredient(ingredient: Ingredient): any,
  removeIncludedIngredient(ingredient: Ingredient): any,
  removeExcludedIngredient(ingredient: Ingredient): any,
};

export default class IngredientFilters extends React.PureComponent<Props, *> {
  render() {
    const {
      ingredients,
      includeIngredient,
      excludeIngredient,
      removeIncludedIngredient,
      removeExcludedIngredient,
    } = this.props;

    return (
      <Layout>
        <List>
          <Label>Include:</Label>
          {ingredients.include.map(ingredient => (
            <Item
              key={ingredient.id}
              ingredient={ingredient}
              onRemove={removeIncludedIngredient}
            />
          ))}
          <IngredientPicker value={null} onChange={includeIngredient} />
        </List>
        <List>
          <Label>Exclude:</Label>
          {ingredients.exclude.map(ingredient => (
            <Item
              key={ingredient.id}
              ingredient={ingredient}
              onRemove={removeExcludedIngredient}
            />
          ))}
          <IngredientPicker value={null} onChange={excludeIngredient} />
        </List>
      </Layout>
    );
  }
}
