export type PlanMealRecipeData = {
  id: string;
  title: string;
  coverImage: {
    id: string;
    url: string;
  };
};

export type PlanMealData = {
  id: string;
  cooking: PlanMealRecipeData[];

  eating: PlanMealData[];
};

export type PlanDayData = {
  id: string;
  date: number;
  breakfast: PlanMealData;
  lunch: PlanMealData;
  dinner: PlanMealData;
};
