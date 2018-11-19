import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';
import { pathOr } from 'ramda';
import firestore from 'services/firestore';
import graph, { Graph } from 'services/graph';
import planner from 'models/Schedule/planner';
import logger from './logger';
import { TransactionFunction } from 'types';

logger.info(`Neo4J connection on ${config.database.neo4j.endpoint}`);

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password),
);

process.on('exit', () => {
  return driver.close();
});

export type Context = {
  driver: typeof driver;
  transaction: (txFunction: TransactionFunction<any>) => Promise<{}>;
  writeTransaction: (txFunction: TransactionFunction<any>) => Promise<{}>;
  readTransaction: (txFunction: TransactionFunction<any>) => Promise<{}>;
  firestore: typeof firestore;
  graph: Graph;
  planner: typeof planner;
  user: { id: string };
  scopes: string[];
};

export const createContext = async (req): Promise<Context> => {
  const isMutation = req.body.query.startsWith('mutation');

  const user = req.user ? { ...req.user, id: req.user.sub } : null;
  const scopes = pathOr<string>('', ['user', 'scope'], req).split(' ');

  const context: Context = {
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

    firestore,
    graph: graph({ writeMode: isMutation, user, scopes }),
    planner,

    user,
    scopes,
  };

  return context;
};
