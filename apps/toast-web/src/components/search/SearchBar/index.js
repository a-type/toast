// @flow
import React from 'react';
import { Docked } from 'components/generic';
import Input from './Input';
import { Consumer, type SearchContext } from '../context';
import Suggestions from './Suggestions';
import TermSuggestion from './TermSuggestion';
import IngredientSuggestion from './IngredientSuggestion';
import Container from './Container';
import SectionTitle from './SectionTitle';

export default () => (
  <Consumer>
    {({ state, actions }: SearchContext) => (
      <Docked>
        {({ anchorRef, renderDocked }) => (
          <Container active={state.active}>
            <Input
              innerRef={anchorRef}
              style={{ width: '100%' }}
              name="searchTerm"
              value={state.term}
              onChange={e => actions.setTerm(e.target.value)}
              onFocus={actions.onTermFocus}
              onBlur={actions.onTermBlur}
              active={state.active}
              placeholder="Search for recipes or ingredients..."
            />
            {state.suggestions.length ||
              (state.term.length > 2 &&
                renderDocked(
                  <Suggestions>
                    <TermSuggestion onClick={() => {}}>
                      Search for recipes with "{state.term}"
                    </TermSuggestion>
                    <SectionTitle>Ingredients</SectionTitle>
                    {state.suggestions.ingredients.map(sug => (
                      <IngredientSuggestion
                        key={sug.ingredient.id}
                        suggestion={sug}
                      />
                    ))}
                  </Suggestions>,
                ))}
          </Container>
        )}
      </Docked>
    )}
  </Consumer>
);
