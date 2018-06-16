// @flow
import React from 'react';
import { Consumer, type SearchContext } from '../context';
import Container from './Container';
import { H2 } from 'components/generic';
import Filter from './Filter';

export default () => (
  <Consumer>
    {({ state: { term, filters } }: SearchContext) => {
      if (term.length === 0 && filters.ingredients.length === 0) {
        return <div />;
      }

      return (
        <Container>
          <H2>Searching for "{term}"</H2>
          {filters.ingredients.map(filter => (
            <Filter key={filter.ingredient.id} filter={filter} />
          ))}
        </Container>
      );
    }}
  </Consumer>
);
