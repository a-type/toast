import React from 'react';
import { Tip } from 'components/generic';
import { Link } from 'components/text';
import { sentence } from 'change-case';
import { Ingredient } from 'generated/schema';

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
    return (
      <Tip
        disabled={!this.state.hovered}
        placement="top"
        tipContent={<div>{sentence(ingredient.name)}</div>}
      >
        {({ ref }) => (
          <div style={{ display: 'inline-block' }} ref={ref}>
            <Link
              onMouseEnter={this.startHover}
              onMouseLeave={this.endHover}
              to={`/ingredients/${encodeURIComponent(ingredient.id)}`}
            >
              {children || sentence(ingredient.name)}
            </Link>
          </div>
        )}
      </Tip>
    );
  }
}
