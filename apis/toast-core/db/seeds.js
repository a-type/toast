import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';
import uuid from 'uuid';
import bcrypt from 'bcryptjs';
import { id } from '../src/tools';

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password)
);

const session = driver.session();

const seed = async () => {
  const userId = id('ToastMaster');
  await session.writeTransaction(async tx => {
    await tx.run(`
    CREATE (u:User {name: "ToastMaster", username: "toastmaster", id: "${userId}"})
    `);
    const hashedPassword = await bcrypt.hash(
      config.security.masterPassword,
      10
    );
    await tx.run(
      `
    MATCH (u:User {id: "$userId"})
    CREATE (u)<-[:AUTHENTICATES]-(c:Credential {email: $email, password: $password})
    `,
      {
        userId,
        email: config.security.masterEmail,
        password: hashedPassword
      }
    );
    await tx.run(`
    MATCH (u:User {id: "${userId}"})
    CREATE (r:Recipe {title: "Toast", description: "Just toast!", id: "${id(
      'Toast'
    )}"}),
      (r)<-[:INGREDIENT_OF {unit: "slice", value: 1, index: 0, id: "${uuid()}", text: "1 slice of bread", unitTextMatch: "slice", valueTextMatch: "1", ingredientTextMatch: "bread"}]-(i:Ingredient {id: "${id(
      'bread'
    )}", name: "bread", description: "Bread!"}),
      (r)<-[:STEP_OF {id: "${uuid()}", index: 0}]-(s:Step {id: "${uuid()}", text: "Toast bread in toaster."}),
      (r)<-[:AUTHOR_OF]-(u)
    RETURN r;
    `);
    await tx.run(`
    CREATE (i:Ingredient { id: 'unknown-0000', name: 'unknown' }) RETURN i;
    `);
    await tx.run(`
    MATCH (bread:Ingredient {name: "bread"}), (u:User {id: "${userId}"})
    CREATE (r:Recipe {title: "French Toast", description: "Better toast", id: "${id(
      'French Toast'
    )}"}),
      (r)<-[:INGREDIENT_OF {id: "${uuid()}", unit: "slice", value: 4, index: 0, text: "4 slices of bread", unitTextMatch: "slices", valueTextMatch: "4", ingredientTextMatch: "bread"}]-(bread),
      (r)<-[:INGREDIENT_OF {id: "${uuid()}", value: 1, index: 1, text: "1 egg", unitTextMatch: null, ingredientTextMatch: "egg", valueTextMatch: "1"}]-(egg:Ingredient {id: "${id(
      'egg'
    )}", name: "egg"}),
      (r)<-[:INGREDIENT_OF {id: "${uuid()}", unit: "cup", value: 0.25, index: 2, text: "1/4 cup milk", unitTextMatch: "cup", valueTextMatch: "1/4", ingredientTextMatch: "milk"}]-(milk:Ingredient {id: "${id(
      'milk'
    )}", name: "milk"}),
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
