import gcloudStorage from 'services/gcloudStorage';
import { RECIPE_FIELDS } from 'schema/recipes/service';

export const IMAGE_FIELDS = `.id, .url`;

export const getRecipeCoverImage = async (id, ctx) => {
  const session = ctx.getSession();
  const coverImage = await session.run(
    `
      MATCH (i:Image)<-[:COVER_IMAGE]-(:Recipe {id: $id})
      RETURN i { ${IMAGE_FIELDS} }
    `,
    { id }
  );

  return coverImage.records.length > 0 ? coverImage.records[0].get('i') : null;
};

export const updateRecipeCoverImage = async (id, input, ctx) => {
  const session = ctx.getSession();
  const file = await input.file;
  const uploaded = await gcloudStorage.upload(file, 'images');
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH (r:Recipe { id: $id })
      MERGE (r)-[:COVER_IMAGE]->(i:Image {id: $imageId, url: $url})
      RETURN r { ${RECIPE_FIELDS} }, i { ${IMAGE_FIELDS} }
      `
    );

    const recipe = result.records[0].get('r');
    recipe.coverImage = result.records[0].get('i');
    return recipe;
  });
};
