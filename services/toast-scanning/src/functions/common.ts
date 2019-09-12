import { aqlQuery, aql } from 'toast-common';
import { Food } from '../services/lookupFoods/lookupFoods';

export const createFood = async (name: string): Promise<Food> => {
  if (!name) {
    return null;
  }

  try {
    const result = await aqlQuery(aql`
      INSERT {
        name: ${name},
        alternateNames: [],
        searchHelpers: [],
        verified: false,
        createdAt: ${new Date().getTime()}
      } INTO Foods
      RETURN NEW
    `);

    const food = await result.next();
    return {
      id: food._key,
      name: food.name,
    };
  } catch (err) {
    if (err.statusCode === 409) {
      const result = await aqlQuery(aql`
        FOR food IN Foods
          FILTER food.name == ${name}
          LIMIT 1
          RETURN food
      `);

      if (!result.hasNext()) {
        // this is weird. we got a conflict but no duplicate food
        console.error(
          `Food creation conflicted, but no duplicate food found by name ${name}`,
        );
      } else {
        const food = await result.next();
        return {
          id: food._key,
          name: food.name,
        };
      }
    } else {
      console.error('Failed to create food ' + name, err);
      throw new Error('Failed to create food ' + name);
    }
  }
};
