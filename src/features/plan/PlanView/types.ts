export type PlanMeal = {
  id: string;
};

export type PlanDay = {
  id: string;
  date: number;
  breakfast: PlanMeal;
  lunch: PlanMeal;
  dinner: PlanMeal;
};
