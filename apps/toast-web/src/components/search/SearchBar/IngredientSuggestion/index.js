// @flow
import React from 'react';
import { type IngredientSuggestion } from '../../context';
import Item from './Item';
import { Button } from 'components/generic';

type Props = {
  suggestion: IngredientSuggestion,
  onSelected(): mixed,
};

export default class IngredientSuggestionItem extends React.PureComponent<
  Props,
> {
  handleInclude = () => {
    this.props.suggestion.onInclude();
    this.props.onSelected();
  };

  handleExclude = () => {
    this.props.suggestion.onExclude();
    this.props.onSelected();
  };

  render() {
    const {
      suggestion: { onInclude, onExclude, ingredient },
    } = this.props;
    return (
      <Item>
        <span>{ingredient.name}</span>
        <Button.Icon name="create" onClick={this.handleInclude} />
        <Button.Icon name="delete-button" onClick={this.handleExclude} />
      </Item>
    );
  }
}
