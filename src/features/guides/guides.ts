import { GuideName, Guide } from './types';

const guides: { [key: string]: Guide } = {
  addRecipes: {
    name: 'addRecipes',
    summary: 'Add recipes to use while planning',
    text:
      'On this page, you can add new recipes to your collection. These recipes can then be used when you plan meals. The easiest way to add a recipe is using our Scanner, which can read recipes from webpages. You can also search for recipes that other users have scanned.',
    page: '/recipes/find',
    action: 'Start adding recipes',
  },
  plan: {
    name: 'plan',
    summary: 'Plan your upcoming week',
    text: "Add recipes you've collected to your plan for next week's meals.",
    page: '/plan',
    action: 'Start planning meals',
  },
};

export const getGuide = (guideName: GuideName): Guide => {
  return guides[guideName];
};
