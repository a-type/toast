import stringSimilarity from 'string-similarity';
import { aqlQuery, aql } from 'toast-common';

export type Food = {
  id: string;
  name: string;
};

const ensureCloseEnough = (
  searchTerm: string,
  food: { id: string; name: string; alternateNames: string[] },
) => {
  if (!food) {
    return null;
  }
  const passed = getOverallSimilarity(food, searchTerm) > 0.75;

  return passed ? food : null;
};

const getOverallSimilarity = (food: any, term: string) => {
  const allComparisons = [food.name, ...(food.alternateNames || [])];
  return allComparisons.reduce(
    (highest, name) =>
      Math.max(stringSimilarity.compareTwoStrings(term, name), highest),
    0,
  );
};

const findClearWinner = (candidates: any[], term: string) => {
  if (candidates.length === 0) {
    return null;
  }
  if (candidates.length === 1) {
    return candidates[0];
  }

  const scoreOfFirstResult = getOverallSimilarity(candidates[0], term);
  const scoreOfSecondResult = getOverallSimilarity(candidates[1], term);

  if (scoreOfSecondResult / scoreOfFirstResult < 0.85) {
    return candidates[0];
  }
};

export default async (ingredientTexts: string[]): Promise<Food[]> =>
  Promise.all(
    ingredientTexts.map(async text => {
      const result = await aqlQuery(aql`
    FOR ing IN IngredientSearchView SEARCH PHRASE(ing.name, ${text}, 'text_en')
      SORT BM25(ing) DESC
      LIMIT 10
      RETURN ing
  `);

      const candidates = await result.all();

      const foundFood = ensureCloseEnough(
        text,
        findClearWinner(candidates, text),
      );

      if (foundFood) {
        return foundFood;
      } else {
        return null;
      }
    }),
  );
