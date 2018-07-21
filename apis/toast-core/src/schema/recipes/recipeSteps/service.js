import uuid from 'uuid';

export const getForRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    `
    MATCH (step:Step)-[rel:STEP_OF]->(:Recipe {id: $id})
    RETURN rel { .id, .index }, step { .id, .text } ORDER BY rel.index
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
      CREATE (recipe)<-[rel:STEP_OF {id: $relId, index: index}]-(step:Step {text: $text})
      RETURN rel {.id, .index}
      `,
      { id: recipeId, relId: uuid(), text: args.text }
    );

    if (result.records.length) {
      return result.records[0].get('rel');
    }
  });
};

export const updateRecipeStep = async (id, args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH ()<-[rel:STEP_OF {id: $relId}]-(step)
      SET step += $stepProps
      RETURN rel {.id, .index}
      `,
      {
        relId: id,
        stepProps: pick(['text'], args)
      }
    );

    if (result.records.length) {
      return result.records[0].get('rel');
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
