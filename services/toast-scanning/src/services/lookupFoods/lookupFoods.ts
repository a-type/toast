import stringSimilarity from 'string-similarity';
import { aqlQuery, aql, logger } from 'toast-common';

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
  logger.debug(`Comparing "${searchTerm}" and ${JSON.stringify(food)}`);

  const similarity = getOverallSimilarity(food, searchTerm);

  const passed = similarity > 0.75;
  logger.debug(`Passed: ${passed}, similarity: ${similarity}`);

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

  const sorted = candidates.sort(
    // sorting descending by score
    (a, b) => getOverallSimilarity(b, term) - getOverallSimilarity(a, term),
  );

  const scoreOfFirstResult = getOverallSimilarity(sorted[0], term);
  logger.debug(`Score for first candidate: ${scoreOfFirstResult}`);
  const scoreOfSecondResult = getOverallSimilarity(sorted[1], term);
  logger.debug(`Score for second candidate: ${scoreOfSecondResult}`);

  if (scoreOfSecondResult / scoreOfFirstResult < 0.85) {
    return sorted[0];
  }

  logger.debug(`No clear winner found in list ${JSON.stringify(sorted)}`);
};

export default async (ingredientTexts: string[]): Promise<Food[]> =>
  Promise.all(
    ingredientTexts.map(async text => {
      if (!text) {
        logger.debug(`Tried to lookup food with empty string`);
        return null;
      }

      const result = await aqlQuery(aql`
        FOR food IN FoodSearchView SEARCH PHRASE(food.name, ${text}, 'text_en') OR PHRASE(food.alternateNames, ${text}, 'text_en') OR PHRASE(food.searchHelpers, ${text}, 'text_en')
          SORT BM25(food) ASC
          LIMIT 10
          RETURN {
            id: food._key,
            name: food.name,
            searchHelpers: food.searchHelpers,
            alternateNames: food.alternateNames
          }
      `);

      const candidates = await result.all();
      logger.debug(
        `Food candidates for "${text}": ${JSON.stringify(candidates)}`,
      );

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
