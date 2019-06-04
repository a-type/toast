export type PlanMealRecipeData = {
  id: string;
  title: string;
  attribution: string;
  description: string;
  sourceUrl: string;
  coverImageUrl: string;
};

export type PlanMealData = {
  servings: number;
  mealName: string;
  node: PlanMealRecipeData;
};

export type PlanDayData = {
  id: string;
  date: number;
  cookingConnection: {
    edges: PlanMealData[];
  };
};
