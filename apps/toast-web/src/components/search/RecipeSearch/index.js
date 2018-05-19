// @flow
import React from 'react';
import { Input } from 'components/generic';
import IngredientFilters from './IngredientFilters';
import Container from './Container';
import { Consumer, type SearchContext } from '../context';

export default () => (
  <Consumer>
    {({ state, actions }: SearchContext) => (
      <Container active={state.active}>
        <Input
          style={{ width: '100%' }}
          name="searchTerm"
          value={state.term}
          onChange={e => actions.setTerm(e.target.value)}
          onFocus={actions.onTermFocus}
          onBlur={actions.onTermBlur}
          active={state.active}
          placeholder="Search for keywords..."
        />
        <IngredientFilters
          ingredients={state.ingredients}
          includeIngredient={actions.includeIngredient}
          excludeIngredient={actions.excludeIngredient}
          removeIncludedIngredient={actions.removeIncludedIngredient}
          removeExcludedIngredient={actions.removeExcludedIngredient}
        />
      </Container>
    )}
  </Consumer>
);
