export type PlanMealRecipeData = {
  id: string;
  title: string;
  coverImage: {
    id: string;
    url: string;
  };
};

export type PlanMealCookingEdge = {
  servings: number;
  recipe: PlanMealRecipeData;
};

export type PlanMealData = {
  id: string;
  cooking: PlanMealCookingEdge[];

  eating: PlanMealData[];
};

export type PlanDayData = {
  id: string;
  date: number;
  breakfast: PlanMealData;
  lunch: PlanMealData;
  dinner: PlanMealData;
};
