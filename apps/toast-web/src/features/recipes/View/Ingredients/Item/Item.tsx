import React from 'react';
import { toDisplay } from 'formatters/unitValue';
import IngredientLink from 'features/ingredients/Link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import { Ingredient } from 'generated/schema';
import RangeHighlighter, { Range } from 'components/generic/RangeHighlighter';

const GetPreferredServings = gql`
  query IngredientGetPreferredServings {
    preferredServings @client
  }
`;

export interface IngredientItemProps {
  servings: number;
  value?: number;
  valueStart?: number;
  valueEnd?: number;
  unit?: string;
  unitStart?: number;
  unitEnd?: number;
  ingredient: Ingredient;
  ingredientStart?: number;
  ingredientEnd?: number;
  text: string;
}

interface IngredientItemInternalProps extends IngredientItemProps {
  preferredServings?: number;
}

class IngredientItem extends React.Component<IngredientItemInternalProps> {
  getTextAtRange = ({ start, end }: { start: number; end: number }) =>
    this.props.text.slice(start, end);

  renderValue = (valueText: string) => {
    const { servings, preferredServings, value } = this.props;

    if (!preferredServings) {
      return <b key={`value`}>{valueText}</b>;
    }

    return (
      <b key={`value`}>{toDisplay((preferredServings / servings) * value)}</b>
    );
  };

  renderUnit = (unitText: string) => {
    const { servings, preferredServings, unit } = this.props;

    if (servings === 1 && preferredServings && preferredServings > 1) {
      return <span key={`unit`}>{pluralize(unit)}</span>;
    }

    return <span key={`unit`}>{unitText}</span>;
  };

  renderIngredient = (ingredientText: string) => {
    const { ingredient } = this.props;

    return (
      <IngredientLink key={`ingredient`} ingredient={ingredient}>
        {ingredientText}
      </IngredientLink>
    );
  };

  convertStringsToSpans = (items: React.ReactNode[]) =>
    items.map(item => {
      if (typeof item === 'string' && item) {
        return <span key={item}>{item}</span>;
      }

      return item;
    });

  render() {
    const {
      text,
      ingredientStart,
      ingredientEnd,
      unitStart,
      unitEnd,
      valueStart,
      valueEnd,
    } = this.props;

    const ranges: Range[] = [
      {
        name: 'ingredient',
        start: ingredientStart,
        end: ingredientEnd,
        render: this.renderIngredient,
      },
      { name: 'unit', start: unitStart, end: unitEnd, render: this.renderUnit },
      {
        name: 'value',
        start: valueStart,
        end: valueEnd,
        render: this.renderValue,
      },
    ].sort((a, b) => b.start - a.start);

    return (
      <li>
        <RangeHighlighter text={text} ranges={ranges} />
      </li>
    );
  }
}

export default graphql<
  IngredientItemProps,
  { preferredServings: number },
  {},
  { preferredServings?: number }
>(GetPreferredServings, {
  props: ({ data }) => ({ preferredServings: data.preferredServings }),
})(IngredientItem);
