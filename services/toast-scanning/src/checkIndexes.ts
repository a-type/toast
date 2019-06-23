import neo4j from './services/neo4j';

/**
 * Checks to be sure required indexes are present in the db
 */
export default async () => {
  const session = neo4j.session();
  return session.writeTransaction(async tx => {
    const indexResult = await tx.run(`
    CALL db.indexes()
    `);

    // basic property indexes
    const results = [
      'INDEX ON :User(id)',
      'INDEX ON :Ingredient(name)',
      'INDEX ON :Ingredient(id)',
      'INDEX ON :Recipe(sourceUrl)',
      'INDEX ON :Recipe(id)',
      'INDEX ON :RecipeIngredient(id)',
    ].map(index => ({
      index,
      exists: indexResult.records.some(
        record => record.get('description') === index,
      ),
    }));

    // full-text named indexes
    const namedResults = ['ingredients'].map(index => ({
      index,
      exists: indexResult.records.some(
        record => record.get('indexName') === index,
      ),
    }));

    const failed = [...results, ...namedResults].filter(r => !r.exists);

    if (failed.length) {
      console.warn(
        `IMPORTANT WARNING: Expected indexes missing: ${failed
          .map(f => f.index)
          .join(', ')}`,
      );
    } else {
      console.info('All indexes good');
    }
  });
};
