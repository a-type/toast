// @flow
import React from 'react';
import { type IngredientSuggestion } from '../../context';
import { Span } from 'components/generic';
import Item from './Item';

type Props = {
  suggestion: IngredientSuggestion,
};

export default class IngredientSuggestionItem extends React.PureComponent<
  Props,
> {
  render() {
    return (
      <Item>
        <Span>{this.props.suggestion.ingredient.name}</Span>
      </Item>
    );
  }
}
