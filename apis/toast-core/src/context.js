import jwt from 'jsonwebtoken';
import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';
import logger from './logger';
// import { neo4jGraphQLBinding } from 'neo4j-graphql-binding';
// import { typeDefs } from './schema';

console.info(`Neo4J connection on ${config.database.neo4j.endpoint}`);

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password)
);

process.on('exit', () => {
  return driver.close();
});

// const neo4jBinding = neo4jGraphQLBinding({
//   typeDefs,
//   driver
// });

const getToken = req => {
  const header = req.get('AUTHORIZATION');
  if (!header) {
    return { user: null };
  }

  return jwt.verify(header.replace('Bearer ', ''), config.security.tokenSecret);
};

export const createContext = req => {
  const token = getToken(req);
  let session;
  return {
    driver,
    getSession: () => {
      if (session) {
        return session;
      }
      session = driver.session();
      return session;
    },
    // neo4jBinding,
    user: token.user
  };
};
