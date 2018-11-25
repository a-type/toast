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

export interface IngredientItemProps {
  servings: number;
  value?: number;
  valueTextMatch?: string;
  unit?: string;
  unitTextMatch?: string;
  ingredient: Ingredient;
  ingredientTextMatch: string;
  text: string;
}

interface IngredientItemInternalProps extends IngredientItemProps {
  preferredServings?: number;
}

class IngredientItem extends React.Component<IngredientItemInternalProps> {
  renderValue = key => {
    const { servings, preferredServings, value, valueTextMatch } = this.props;

    if (!preferredServings) {
      return <b key={`value-${key}`}>{valueTextMatch}</b>;
    }

    return (
      <b key={`value-${key}`}>
        {toDisplay((preferredServings / servings) * value)}
      </b>
    );
  };

  renderUnit = key => {
    const { servings, preferredServings, unit, unitTextMatch } = this.props;

    if (servings === 1 && preferredServings && preferredServings > 1) {
      return <span key={`unit-${key}`}>{pluralize(unit)}</span>;
    }

    return <span key={`unit-${key}`}>{unitTextMatch}</span>;
  };

  renderIngredient = key => {
    const { ingredient, ingredientTextMatch } = this.props;

    return (
      <IngredientLink key={`ingredient-${key}`} ingredient={ingredient}>
        {ingredientTextMatch}
      </IngredientLink>
    );
  };

  textArraySubstituted = (textArray, match, substituteFn) =>
    textArray.reduce((newArray, item, idx) => {
      if (typeof item === 'string' && item.includes(match)) {
        const index = item.indexOf(match);
        const before = item.slice(0, index);
        const after = item.slice(index + match.length);
        return [...newArray, before, substituteFn(idx), after];
      }
      return [...newArray, item];
    }, []);

  withValue = textArray => {
    const { valueTextMatch } = this.props;

    if (valueTextMatch) {
      return this.textArraySubstituted(
        textArray,
        valueTextMatch,
        this.renderValue,
      );
    }

    return textArray;
  };

  withUnit = textArray => {
    const { unitTextMatch } = this.props;

    if (unitTextMatch) {
      return this.textArraySubstituted(
        textArray,
        unitTextMatch,
        this.renderUnit,
      );
    }

    return textArray;
  };

  withIngredient = textArray => {
    const { ingredientTextMatch } = this.props;

    if (ingredientTextMatch) {
      return this.textArraySubstituted(
        textArray,
        ingredientTextMatch,
        this.renderIngredient,
      );
    }

    return textArray;
  };

  convertStringsToSpans = textArray =>
    textArray.map(item => {
      if (typeof item === 'string' && item) {
        return <span key={item}>{item}</span>;
      }

      return item;
    });

  render() {
    const { text } = this.props;

    return (
      <li>
        {this.convertStringsToSpans(
          this.withIngredient(this.withUnit(this.withValue([text]))),
        )}
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
