import casual from 'casual';
import { MockList } from 'graphql-tools';
import uuid from 'uuid';

const UNITS = ['cup', 'tablespoon', 'teaspoon', 'pound', 'can'];
casual.define('unit', () => UNITS[casual.integer(0, UNITS.length)]);

casual.define('image', () => 'https://placeimg.com/640/480/nature');

casual.define('weekday', () => Math.floor(Math.random() * 7));

export default {
  Recipe: () => ({
    title: casual.title,
    description: () => casual.sentences(casual.integer(0, 2)),
    published: () => true,
    coverImage: () => {
      if (casual.integer(0, 10) < 5) {
        return {
          id: uuid(),
          url: (casual as any).image,
        };
      }
      return null;
    },
    sourceUrl: 'http://www.forkknifeswoon.com/simple-homemade-chicken-ramen/',
    displayType: 'LINK',
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
    const unit = (casual as any).unit;
    const value = casual.integer(1, 6);
    const text = value + ' ' + unit + ' of Ingredient';

    return {
      unit,
      value,
      unitTextMatch: unit,
      valueTextMatch: '' + value,
      ingredientTextMatch: 'Ingredient',
      text,
    };
  },

  Image: () => ({
    url: (casual as any).image,
  }),

  Date: () => new Date(casual.date()),

  WeekDay: () => (casual as any).weekday,
};
