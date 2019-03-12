import React from 'react';
import { Tip } from 'components/generic';
import { Link } from 'components/text';
import { sentence } from 'change-case';
import { Ingredient } from 'generated/schema';
import { pathOr } from 'ramda';
import { Text } from 'grommet';

export interface IngredientLinkProps {
  ingredient: Ingredient;
  isHighlighted?: boolean;
}

interface IngredientLinkState {
  hovered: boolean;
}

export default class IngredientLink extends React.PureComponent<
  IngredientLinkProps,
  IngredientLinkState
> {
  state = { hovered: false };

  startHover = () => this.setState({ hovered: true });
  endHover = () => this.setState({ hovered: false });

  render() {
    const { ingredient, isHighlighted, children } = this.props;

    if (!ingredient) {
      return <Text>{children || 'Unknown ingredient'}</Text>;
    }

    const ingredientName = sentence(
      pathOr('Unknown Ingredient', ['name'], ingredient),
    );
    return (
      <Tip
        disabled={!this.state.hovered}
        placement="top"
        tipContent={<div>{ingredientName}</div>}
      >
        {({ ref }) => (
          <div style={{ display: 'inline-block' }} ref={ref}>
            <Link
              onMouseEnter={this.startHover}
              onMouseLeave={this.endHover}
              to={`/ingredients/${encodeURIComponent(ingredient.id)}`}
            >
              {children || ingredientName}
            </Link>
          </div>
        )}
      </Tip>
    );
  }
}
