import React from 'react';
import { Link } from 'components/text';
import { sentence } from 'change-case';
import { pathOr } from 'ramda';
import { Typography } from '@material-ui/core';

export interface IngredientLinkProps {
  ingredient: any; // FIXME
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
      <Typography>
        {(ingredient && ingredient.name) || 'Unknown ingredient'}
      </Typography>
    );
  }
}
