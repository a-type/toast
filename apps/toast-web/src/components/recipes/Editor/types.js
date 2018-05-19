// @flow

export type QueryData = {
  loading: boolean,
  error: string | null,
  recipe: Recipe,
  refetch(): any,
};
