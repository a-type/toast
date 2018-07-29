import uuid from 'uuid';
import { RECIPE_FIELDS } from '../service';
import { pick } from 'ramda';

export const RECIPE_STEP_FIELDS = '.id, .index';
export const STEP_FIELDS = '.id, .text';

export const getForRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    `
    MATCH (step:Step)-[rel:STEP_OF]->(:Recipe {id: $id})
    RETURN rel { ${RECIPE_STEP_FIELDS} }, step {${STEP_FIELDS}} ORDER BY rel.index
  `,
    { id }
  );

  return result.records.map(record => ({
    ...record.get('rel'),
    step: record.get('step')
  }));
};

export const createRecipeStep = async (recipeId, args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH (recipe:Recipe {id: $id})
      OPTIONAL MATCH (recipe)<-[allSteps:STEP_OF]-()
      WITH recipe, count(allSteps) as index
      CREATE (recipe)<-[rel:STEP_OF {id: $relId, index: index}]-(step:Step {id: $stepId, text: $text})
      RETURN recipe {${RECIPE_FIELDS}}
      `,
      { id: recipeId, relId: uuid(), stepId: uuid(), text: args.text }
    );

    if (result.records.length) {
      return result.records[0].get('recipe');
    }
  });
};

export const deleteRecipeStep = async (id, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH (:User {id: $userId})-[:AUTHOR_OF]->(recipe:Recipe)<-[rel:STEP_OF {id: $id}]-()
      DELETE rel
      RETURN recipe {${RECIPE_FIELDS}}
      `,
      {
        id,
        userId: ctx.user.id
      }
    );

    if (result.records.length) {
      return result.records[0].get('recipe');
    }
  });
};

export const updateRecipeStep = async (id, args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH (:User {id: $userId})-[:AUTHOR_OF]->(recipe:Recipe)<-[rel:STEP_OF {id: $relId}]-(step)
      SET step += $stepProps
      RETURN rel {${RECIPE_STEP_FIELDS}}, step {${STEP_FIELDS}}
      `,
      {
        relId: id,
        stepProps: pick(['text'], args),
        userId: ctx.user.id
      }
    );

    if (result.records.length) {
      return {
        ...result.records[0].get('rel'),
        step: result.records[0].get('step')
      };
    }
  });
};

export const moveRecipeStep = async (recipeId, args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const stepsResult = await tx.run(
      `
      MATCH (recipe:Recipe {id: $id})<-[rel:STEP_OF]-(step:Step)
      RETURN rel {.index}, step {.id} ORDER BY rel.index
      `,
      {
        id: recipeId
      }
    );

    if (stepsResult.records.length > Math.max(args.fromIndex, args.toIndex)) {
      const stepIds = stepsResult.records.map(rec => rec.get('step').id);
      stepIds.splice(args.toIndex, 0, stepIds.splice(args.fromIndex, 1)[0]);
      const indexAndIds = stepIds.map((id, idx) => ({ id, index: idx }));
      await tx.run(
        `
        UNWIND $indexAndIds as indexAndUuid
        MATCH (:Recipe {id: $id})<-[rel:STEP_OF]-(:Step {id: indexAndUuid.id})
        SET rel.index = indexAndUuid.index
        `,
        { indexAndIds, id: recipeId }
      );
    }

    const recipeResult = await tx.run(
      `MATCH (r:Recipe {id: $id}) RETURN r {.id, .title, .description}`,
      { id: recipeId }
    );
    return recipeResult.records[0].get('r');
  });
};
