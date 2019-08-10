export type PlanMealRecipeData = {
  id: string;
  title: string;
  attribution: string;
  description: string;
  sourceUrl: string;
  coverImageUrl: string;
};

export type PlanCookingEdge = {
  servings: number;
  mealName: string;
  date: number;
  node: PlanMealRecipeData;
};
