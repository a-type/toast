import { pick } from 'ramda';
import uuid from 'uuid';
import s3 from 'services/s3';

export const createRecipe = async (user, { title, description }, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    `
      MERGE (r:Recipe {title: $title, description: $description, id: $id}),
        (r)<-[:AUTHOR_OF]-(u:User {id: userId})
      RETURN r {.id, .title, .description}, u {.id, .name, .username}
    `,
    {
      title,
      description,
      id: uuid(),
      userId: user.id
    }
  );

  const recipe = result.records[0].get('r');
  const author = result.records[0].get('u');

  return {
    ...recipe,
    author
  };
};

export const updateRecipe = async (args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const details = await tx.run(
      `
      MATCH (recipe:Recipe {id: $id})
      SET recipe += $input
      RETURN recipe {.id, .title, .description};
    `,
      { id: args.id, input: pick(['title', 'description'], args.input) }
    );

    if (details.records.length === 0) {
      throw new Error("That recipe doesn't exist");
    }

    const ingredients = args.input.ingredients || {};
    if (ingredients.push) {
      await tx.run(
        `
        MATCH (recipe:Recipe {id: $id}), (ingredient:Ingredient {id: $ingredientId})
        OPTIONAL MATCH (recipe)<-[allIngredients:INGREDIENT_OF]-()
        WITH recipe, count(allIngredients) as index, ingredient
        CREATE (recipe)<-[rel:INGREDIENT_OF {id: $relId, index: index, unit: $unit, unitValue: $unitValue}]-(ingredient)
        `,
        {
          id: args.id,
          ingredientId: ingredients.push.ingredientId,
          relId: uuid(),
          unit: ingredients.push.unit,
          unitValue: ingredients.push.unitValue
        }
      );
    } else if (ingredients.set) {
      await tx.run(
        `
        MATCH (recipe:Recipe {id: $id})<-[rel:INGREDIENT_OF {id: $relId}]-()
        SET rel += $ingredientProps
      `,
        {
          id: args.id,
          relId: ingredients.set.id,
          ingredientProps: pick(
            ['unit', 'unitValue'],
            ingredients.set.ingredient
          )
        }
      );
    } else if (ingredients.move) {
      const ingredientsResult = await tx.run(
        `
        MATCH (recipe:Recipe {id: $id})<-[rel:INGREDIENT_OF]-(ingredient:Ingredient)
        RETURN rel {.index}, ingredient {.id} ORDER BY rel.index
        `,
        {
          id: args.id
        }
      );

      if (
        ingredientsResult.records.length >
        Math.max(ingredients.move.fromIndex, ingredients.move.toIndex)
      ) {
        const ingredientIds = ingredientsResult.records.map(
          rec => rec.get('ingredient').id
        );
        ingredientIds.splice(
          ingredients.move.toIndex,
          0,
          ingredientIds.splice(ingredients.move.fromIndex, 1)[0]
        );
        const indexAndIds = ingredientIds.map((id, idx) => ({
          id,
          index: idx
        }));
        await tx.run(
          `
          UNWIND $indexAndIds as indexAndUuid
          MATCH (:Recipe {id: $id})<-[rel:INGREDIENT_OF]-(:Ingredient {id: indexAndUuid.id})
          SET rel.index = indexAndUuid.index
          `,
          { indexAndIds, id: args.id }
        );
      }
    }
    const steps = args.input.steps || {};
    if (steps.push) {
      await tx.run(
        `
        MATCH (recipe:Recipe {id: $id})
        OPTIONAL MATCH (recipe)<-[allSteps:STEP_OF]-()
        WITH recipe, count(allSteps) as index
        CREATE (recipe)<-[rel:STEP_OF {id: $relId, index: index}]-(step:Step {text: $text})
        `,
        { id: args.id, relId: uuid(), text: steps.push.text }
      );
    } else if (steps.set) {
      await tx.run(
        `
        MATCH (recipe:Recipe {id: $id})<-[:STEP_OF {id: $relId}]-(step)
        SET step += $stepProps
        `,
        {
          id: args.id,
          relId: steps.set.id,
          stepProps: pick(['text'], steps.set.step)
        }
      );
    } else if (steps.move) {
      const stepsResult = await tx.run(
        `
        MATCH (recipe:Recipe {id: $id})<-[rel:STEP_OF]-(step:Step)
        RETURN rel {.index}, step {.id} ORDER BY rel.index
        `,
        {
          id: args.id
        }
      );

      if (
        stepsResult.records.length >
        Math.max(steps.move.fromIndex, steps.move.toIndex)
      ) {
        const stepIds = stepsResult.records.map(rec => rec.get('step').id);
        stepIds.splice(
          steps.move.toIndex,
          0,
          stepIds.splice(steps.move.fromIndex, 1)[0]
        );
        const indexAndIds = stepIds.map((id, idx) => ({ id, index: idx }));
        await tx.run(
          `
          UNWIND $indexAndIds as indexAndUuid
          MATCH (:Recipe {id: $id})<-[rel:STEP_OF]-(:Step {id: indexAndUuid.id})
          SET rel.index = indexAndUuid.index
          `,
          { indexAndIds, id: args.id }
        );
      }
    }

    if (args.input.coverImage) {
      const file = await args.input.coverImage.file;
      const uploaded = await s3.upload(file, 'images');
      await tx.run(
        `
        MATCH (r:Recipe {id: $id})
        MERGE (r)-[:COVER_IMAGE]->(:Image {id: $imageId, url: $url})
        `,
        { id: args.id, imageId: uploaded.id, url: uploaded.url }
      );
    }

    return details.records[0].get('recipe');
  });
};

export const getRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  const recipeResult = await session.run(
    `
      MATCH (recipe:Recipe {id: $id}) RETURN recipe { .id, .title, .description }
    `,
    { id }
  );

  if (recipeResult.records.length === 0) {
    return null;
  }

  return recipeResult.records[0].get('recipe');
};

export const listRecipes = async (
  { offset, count } = { offset: 0, count: 25 },
  ctx
) => {
  const session = ctx.getSession();
  return session.readTransaction(async tx => {
    const result = await tx.run(
      `
        MATCH (recipe:Recipe)
        RETURN recipe { .id, .title, .description }
        SKIP $offset LIMIT $count
      `,
      { offset, count }
    );

    return result.records.map(rec => rec.get('recipe'));
  });
};
