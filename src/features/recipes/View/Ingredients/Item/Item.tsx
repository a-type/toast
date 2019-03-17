import React from 'react';
import { toDisplay } from 'formatters/unitValue';
import IngredientLink from 'features/ingredients/Link';
import pluralize from 'pluralize';
import { Ingredient } from 'generated/schema';
import RangeHighlighter, { Range } from 'components/generic/RangeHighlighter';

export interface IngredientItemProps {
  servings: number;
  quantity?: number;
  quantityStart?: number;
  quantityEnd?: number;
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

  renderQuantity = (valueText: string) => {
    const { servings, preferredServings, quantity: value } = this.props;

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
      quantityStart: valueStart,
      quantityEnd: valueEnd,
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
        render: this.renderQuantity,
      },
    ].sort((a, b) => b.start - a.start);

    return (
      <li>
        <RangeHighlighter text={text} ranges={ranges} />
      </li>
    );
  }
}

export default IngredientItem;
