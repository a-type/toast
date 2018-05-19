import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';
import uuid from 'uuid';

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password)
);

const session = driver.session();

const seed = async () => {
  const userId = uuid();
  await session.writeTransaction(async tx => {
    await tx.run(`
    CREATE (u:User {name: "ToastMaster", username: "toastmaster", id: "${userId}"})
    `);
    await tx.run(`
    MATCH (u:User {id: "${userId}"})
    CREATE (r:Recipe {title: "Toast", description: "Just toast!", id: "${uuid()}"}),
      (r)<-[:INGREDIENT_OF {unit: "slice", unitValue: 1, index: 0, id: "${uuid()}"}]-(i:Ingredient {id: "${uuid()}", name: "Bread", description: "Bread!"}),
      (r)<-[:STEP_OF {id: "${uuid()}", index: 0}]-(s:Step {id: "${uuid()}", text: "Toast bread in toaster."}),
      (r)<-[:AUTHOR_OF]-(u)
    RETURN r;
    `);
    await tx.run(`
    MATCH (bread:Ingredient {name: "Bread"}), (u:User {id: "${userId}"})
    CREATE (r:Recipe {title: "French Toast", description: "Better toast", id: "${uuid()}"}),
      (r)<-[:INGREDIENT_OF {id: "${uuid()}", unit: "slice", unitValue: 4, index: 0}]-(bread),
      (r)<-[:INGREDIENT_OF {id: "${uuid()}", unitValue: 1, index: 1}]-(egg:Ingredient {id: "${uuid()}", name: "Egg"}),
      (r)<-[:INGREDIENT_OF {id: "${uuid()}", unit: "cup", unitValue: 0.25, index: 2}]-(milk:Ingredient {id: "${uuid()}", name: "Milk"}),
      (r)<-[:STEP_OF {id: "${uuid()}", index: 0}]-(:Step {id: "${uuid()}", text: "Mix egg and milk."}),
      (r)<-[:STEP_OF {id: "${uuid()}", index: 1}]-(:Step {id: "${uuid()}", text: "Dip bread in mixture."}),
      (r)<-[:STEP_OF {id: "${uuid()}", index: 2}]-(:Step {id: "${uuid()}", text: "Fry soaked bread in pan with butter."}),
      (r)<-[:AUTHOR_OF]-(u)
    RETURN r;
    `);
  });
};

seed()
  .then(() => {
    console.info('SEEDING DONE');
    driver.close();
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    driver.close();
    process.exit(1);
  });
