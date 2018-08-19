import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password)
);

const session = driver.session();

const indexes = [
  ['Recipe', 'title'],
  ['Ingredient', 'name'],
  ['Credential', 'email'],
  ['Recipe', 'id'],
  ['Ingredient', 'id'],
  ['User', 'id'],
  ['Step', 'id'],
  ['INGREDIENT_OF', 'id'],
  ['STEP_OF', 'id'],
  ['Recipe', 'sourceUrl']
];

const index = async () => {
  console.info(`indexing properties...`);
  await Promise.all(
    indexes.map(pair => session.run(`CREATE INDEX ON :${pair[0]}(${pair[1]})`))
  );

  // APOC full-text indexing
  console.info(`indexing for full-text search...`);
  await session.run(`
    CALL apoc.index.addAllNodes('recipes', {Recipe:["title", "description"]}, {autoUpdate:true});
  `);
  await session.run(`
    CALL apoc.index.addAllNodes('ingredients', {Ingredient:["name"]}, {autoUpdate:true});
  `);
};

index()
  .then(() => {
    console.info('INDEXING DONE');
    driver.close();
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    driver.close();
    process.exit(1);
  });
