import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password),
);

const session = driver.session();

const indexes = [];

const uniqueConstraints = [
  ['Recipe', 'sourceUrl'],
  ['Recipe', 'id'],
  ['Ingredient', 'id'],
  ['RecipeIngredient', 'id'],
  ['Step', 'id'],
  ['User', 'id'],
  ['Ingredient', 'name'],
];

const existsConstraints = [
  ['Recipe', 'id'],
  ['Recipe', 'displayType'],
  ['Ingredient', 'id'],
  ['RecipeIngredient', 'id'],
  ['RecipeIngredient', 'text'],
  ['Step', 'id'],
  ['User', 'id'],
  ['Recipe', 'title'],
  ['Ingredient', 'name'],
];

const index = async () => {
  console.info(`indexing properties...`);
  await Promise.all(
    indexes.map(pair => session.run(`CREATE INDEX ON :${pair[0]}(${pair[1]})`)),
  );
  await Promise.all(
    uniqueConstraints.map(pair =>
      session.run(
        `CREATE CONSTRAINT ON (n:${pair[0]}) ASSERT n.${pair[1]} IS UNIQUE`,
      ),
    ),
  );
  await Promise.all(
    existsConstraints.map(pair =>
      session.run(
        `CREATE CONSTRAINT ON (n:${pair[0]}) ASSERT exists(n.${pair[1]})`,
      ),
    ),
  );

  // APOC full-text indexing
  console.info(`indexing for full-text search...`);
  await session.run(`
    CALL apoc.index.addAllNodes('recipes', {Recipe:["title", "description"]}, {autoUpdate:true});
  `);
  await session.run(`
    CALL apoc.index.addAllNodes('ingredients', {Ingredient:["name", "alternateNames"]}, {autoUpdate:true});
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
