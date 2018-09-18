import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';
import logger from './logger';
import { pathOr } from 'ramda';

console.info(`Neo4J connection on ${config.database.neo4j.endpoint}`);

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password),
);

process.on('exit', () => {
  return driver.close();
});

export const createContext = async req => {
  const isMutation = req.body.query.startsWith('mutation');

  const context = {
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
    user: req.user,
    scopes: pathOr('', ['user', 'scope'], req).split(' '),
  };

  return context;
};
