import { id, timestamp } from '../../tools';
import { StatementResult, Session } from 'neo4j-driver/types/v1';
import stringSimilarity from 'string-similarity';

export type Ingredient = {
  id: string;
  name: string;
};

const convertToLuceneFuzzy = (term: string) =>
  term.replace(/[^a-zA-Z0-9 -]/, '') + '~';

const ensureCloseEnough = (
  searchTerm: string,
  ingredient: { id: string; name: string; alternateNames: string[] },
) => {
  if (!ingredient) {
    return null;
  }
  const allComparisons = [
    ingredient.name,
    ...(ingredient.alternateNames || []),
  ];
  const passed =
    allComparisons.reduce(
      (highest, name) =>
        Math.max(stringSimilarity.compareTwoStrings(searchTerm, name), highest),
      0,
    ) > 0.75;

  return passed ? ingredient : null;
};

const findClearWinner = (result: StatementResult) => {
  if (result.records.length === 0) {
    return null;
  }
  if (result.records.length === 1) {
    return result.records[0].get('node');
  }

  const scoreOfFirstResult = result.records[0].get('score');
  const scoreOfSecondResult = result.records[1].get('score');

  if (scoreOfSecondResult / scoreOfFirstResult < 0.85) {
    return result.records[0].get('node');
  }
};

export default (
  session: Session,
  ingredientTexts: string[],
): Promise<Ingredient[]> =>
  session.readTransaction(async tx => {
    return await Promise.all(
      ingredientTexts.map(async ingredientText => {
        const result = await tx.run(
          `
      CALL db.index.fulltext.queryNodes("ingredients", $match) YIELD node, score
      RETURN node {.id, .name, .alternateNames}, score ORDER BY score DESC LIMIT 10
      `,
          {
            match: convertToLuceneFuzzy(ingredientText),
          },
        );

        let foundIngredient = ensureCloseEnough(
          ingredientText,
          findClearWinner(result),
        );

        if (foundIngredient) {
          return foundIngredient;
        } else {
          return null;
        }
      }),
    );
  });
