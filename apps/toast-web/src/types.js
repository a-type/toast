// @flow

export type Ingredient = {
  id: string,
  name: string,
  description: string,
};

export type RecipeIngredient = {
  id: string,
  ingredient: Ingredient,
  recipe: Recipe,
  unit: string,
  unitValue: number,
  index: number,
};
export type RecipeIngredientParams = {
  ingredientId?: string | null,
  recipeId?: string | null,
  unit?: string,
  unitValue?: number,
  index?: number,
};

export type RecipeStep = {
  id: string,
  index: number,
  step: Step,
};
export type Step = {
  id: string,
  text: string,
};
export type StepParams = {
  text?: string,
  index?: number,
};

export type User = {
  id: string,
  name: string,
  username: string,
};

export type RecipeDisplayType = 'LINK' | 'FULL';

export type Recipe = {
  id: string,
  title: string,
  description: string,
  ingredients: Array<RecipeIngredient>,
  steps: Array<RecipeStep>,
  author: User,
  discoverer: User,
  displayType: RecipeDisplayType,
  attribution: string,
  sourceUrl: string,
};
export type RecipeParams = {
  title?: string,
  description?: string,
};

export type SearchPayload<T> = {
  items: Array<T>,
  total: number,
};

export type Image = {
  id: string,
  url: string,
};
