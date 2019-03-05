export type Image = {
  id: string;
  url: string;
};

export type Recipe = {
  id: string;
  title: string;
  coverImage: Image;
};

export type PlanMeal = {
  id: string;
  note: string;

  cooking: Recipe[];
  eating: PlanMeal[];
};

export type PlanDay = {
  id: string;
  date: number;

  breakfast: PlanMeal;
  lunch: PlanMeal;
  dinner: PlanMeal;
};
