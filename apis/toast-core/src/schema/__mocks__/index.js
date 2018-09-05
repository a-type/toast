import casual from 'casual';
import { MockList } from 'graphql-tools';
import uuid from 'uuid';

const UNITS = ['cup', 'tablespoon', 'teaspoon', 'pound', 'can'];
casual.define('unit', () => UNITS[casual.integer(0, UNITS.length)]);

casual.define('image', () => 'https://placeimg.com/640/480/nature');

export default {
  Recipe: () => ({
    title: casual.title,
    description: () => casual.sentences(casual.integer(0, 2)),
    published: () => true,
    ingredients: () => new MockList([2, 8]),
    steps: () => new MockList([4, 12]),
    coverImage: () => {
      if (casual.integer(0, 10) < 5) {
        return {
          id: uuid(),
          url: casual.image,
        };
      }
      return null;
    },
    sourceUrl: null,
    displayType: 'FULL',
  }),

  Step: () => ({
    text: () => casual.sentences(casual.integer(1, 4)),
  }),

  Ingredient: () => ({
    name: casual.words(casual.integer(1, 2)),
    description: () => casual.sentences(casual.integer(0, 3)),
    attribution: casual.full_name,
  }),

  RecipeIngredient: () => {
    const unit = casual.unit;
    const value = casual.integer(1, 6);
    const text = unit + ' ' + value + ' of Ingredient';

    return {
      unit,
      value,
      unitTextMatch: unit,
      valueTextMatch: '' + value,
      ingredientTextMatch: 'Ingredient',
      text,
    };
  },

  RecipeSearchResponse: () => {
    const total = casual.integer(3, 25);
    return {
      total: () => total,
      items: () => new MockList(total),
    };
  },

  IngredientSearchResponse: () => {
    const total = casual.integer(6, 25);
    return {
      total: () => total,
      items: () => new MockList(total),
    };
  },

  Image: () => ({
    url: casual.image,
  }),
};
