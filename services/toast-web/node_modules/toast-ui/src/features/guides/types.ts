export type GuideName = 'addRecipes' | 'plan';

export type Guide = {
  name: GuideName;
  page: string;
  action: string;
  summary: string;
  text: string;
};
