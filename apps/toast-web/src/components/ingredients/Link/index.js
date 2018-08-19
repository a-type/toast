// @flow

import React, { type Node } from 'react';
import { Link, Tip } from 'components/generic';
import { type Ingredient } from 'types';
import { sentence } from 'change-case';

type Props = {
  ingredient: Ingredient,
  isHighlighted: boolean,
  children: Node,
};

type State = {
  hovered: boolean,
};

export default class IngredientLink extends React.PureComponent<Props, State> {
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
