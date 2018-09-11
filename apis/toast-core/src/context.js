import jwt from 'jsonwebtoken';
import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';
import logger from './logger';

console.info(`Neo4J connection on ${config.database.neo4j.endpoint}`);

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password),
);

process.on('exit', () => {
  return driver.close();
});

const getToken = req => {
  const header = req.get('AUTHORIZATION');
  if (!header) {
    return { user: null };
  }

  return jwt.verify(header.replace('Bearer ', ''), config.security.tokenSecret);
};

export const createContext = async req => {
  const token = getToken(req);

  const isMutation = req.body.query.startsWith('mutation');

  return {
    driver,
    // interop / legacy
    transaction: txFunction => {
      const sess = driver.session();
      if (isMutation) {
        return sess.writeTransaction(txFunction);
      } else {
        return sess.readTransaction(txFunction);
      }
    },
    writeTransaction: txFunction => {
      const sess = driver.session();
      return sess.writeTransaction(txFunction);
    },
    readTransaction: txFunction => {
      const sess = driver.session();
      return sess.readTransaction(txFunction);
    },
    user: token.user,
    roles: token.roles,
  };
};
