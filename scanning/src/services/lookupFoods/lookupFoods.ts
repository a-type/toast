import { Session, StatementResult } from "neo4j-driver/types/v1";
import stringSimilarity from "string-similarity";

export type Food = {
  id: string;
  name: string;
};

const convertToLuceneFuzzy = (term: string) =>
  term.replace(/[^a-zA-Z0-9 -]/, "") + "~";

const ensureCloseEnough = (
  searchTerm: string,
  food: { id: string; name: string; alternateNames: string[] }
) => {
  if (!food) {
    return null;
  }
  const allComparisons = [food.name, ...(food.alternateNames || [])];
  const passed =
    allComparisons.reduce(
      (highest, name) =>
        Math.max(stringSimilarity.compareTwoStrings(searchTerm, name), highest),
      0
    ) > 0.75;

  return passed ? food : null;
};

const findClearWinner = (result: StatementResult) => {
  if (result.records.length === 0) {
    return null;
  }
  if (result.records.length === 1) {
    return result.records[0].get("node");
  }

  const scoreOfFirstResult = result.records[0].get("score");
  const scoreOfSecondResult = result.records[1].get("score");

  if (scoreOfSecondResult / scoreOfFirstResult < 0.85) {
    return result.records[0].get("node");
  }
};

export default (session: Session, ingredientTexts: string[]): Promise<Food[]> =>
  session.readTransaction(async tx => {
    return await Promise.all(
      ingredientTexts.map(async ingredientText => {
        const result = await tx.run(
          `
      CALL db.index.fulltext.queryNodes("foods", $match) YIELD node, score
      RETURN node {.id, .name, .alternateNames}, score ORDER BY score DESC LIMIT 10
      `,
          {
            match: convertToLuceneFuzzy(ingredientText)
          }
        );

        let foundFood = ensureCloseEnough(
          ingredientText,
          findClearWinner(result)
        );

        if (foundFood) {
          return foundFood;
        } else {
          return null;
        }
      })
    );
  });
