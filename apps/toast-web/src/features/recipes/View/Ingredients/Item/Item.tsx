import React from 'react';
import { toDisplay } from 'formatters/unitValue';
import IngredientLink from 'features/ingredients/Link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import pluralize from 'pluralize';
import { Ingredient } from 'generated/schema';

const GetPreferredServings = gql`
  query IngredientGetPreferredServings {
    preferredServings @client
  }
`;

type RangeName = 'ingredient' | 'unit' | 'value';
type Range = {
  name: RangeName;
  start: number;
  end: number;
};

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

  renderValue = () => {
    const {
      servings,
      preferredServings,
      value,
      valueStart,
      valueEnd,
    } = this.props;

    if (!preferredServings) {
      return (
        <b key={`value`}>
          {this.getTextAtRange({ start: valueStart, end: valueEnd })}
        </b>
      );
    }

    return (
      <b key={`value`}>{toDisplay((preferredServings / servings) * value)}</b>
    );
  };

  renderUnit = () => {
    const {
      servings,
      preferredServings,
      unit,
      unitStart,
      unitEnd,
    } = this.props;

    if (servings === 1 && preferredServings && preferredServings > 1) {
      return <span key={`unit`}>{pluralize(unit)}</span>;
    }

    return (
      <span key={`unit`}>
        {this.getTextAtRange({ start: unitStart, end: unitEnd })}
      </span>
    );
  };

  renderIngredient = () => {
    const { ingredient, ingredientStart, ingredientEnd } = this.props;

    return (
      <IngredientLink key={`ingredient`} ingredient={ingredient}>
        {this.getTextAtRange({ start: ingredientStart, end: ingredientEnd })}
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

  renderRange = (rangeName: RangeName) => {
    switch (rangeName) {
      case 'ingredient':
        return this.renderIngredient();
      case 'unit':
        return this.renderUnit();
      case 'value':
        return this.renderValue();
    }

    return null;
  };

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
      } as Range,
      { name: 'unit', start: unitStart, end: unitEnd } as Range,
      { name: 'value', start: valueStart, end: valueEnd } as Range,
    ].sort((a, b) => b.start - a.start);

    const segments: React.ReactNode[] = ranges.reduce(
      (segs, range) => {
        if (range.end - range.start > 0) {
          return [
            segs[0].slice(0, range.start),
            this.renderRange(range.name),
            segs[0].slice(range.end),
            ...segs.slice(1),
          ];
        }
        return segs;
      },
      [text],
    );

    return <li>{this.convertStringsToSpans(segments)}</li>;
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
