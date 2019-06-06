import { v1 as neo4j } from 'neo4j-driver';
import config from 'config';
import { pathOr } from 'ramda';
import firestore from 'services/firestore';
import logger from './logger';
import { TransactionFunction } from 'types';
import planning from 'services/planning';
import gcloudStorage from 'services/gcloudStorage';
import scanning from 'services/scanning';
import firebase from 'services/firebase';
import { auth } from 'firebase-admin';
import DataLoader from 'dataloader';
import { PurchaseListItem } from 'models/PurchaseList';

logger.info(`Neo4J connection on ${config.database.neo4j.endpoint}`);

const driver = neo4j.driver(
  config.database.neo4j.endpoint,
  neo4j.auth.basic(config.database.neo4j.user, config.database.neo4j.password),
);

process.on('exit', () => {
  return driver.close();
});

export type Context = {
  neo4jDriver: typeof driver;
  transaction: <T = any>(txFunction: TransactionFunction<T>) => Promise<T>;
  writeTransaction: <T = any>(txFunction: TransactionFunction<T>) => Promise<T>;
  readTransaction: <T = any>(txFunction: TransactionFunction<T>) => Promise<T>;
  firestore: typeof firestore;
  firebase: typeof firebase;
  planning: typeof planning;
  gcloudStorage: typeof gcloudStorage;
  scanning: typeof scanning;
  user: auth.DecodedIdToken & { id: string };
  scopes: string[];
  getGroupId: () => Promise<string>;
  storeGroupId: (groupId: string) => void;
  getPurchasedIngredientLoader: () => Promise<
    DataLoader<string, PurchaseListItem>
  >;
  cypherContext: {
    userId: string;
  };
};

export const createContext = async (req): Promise<Context> => {
  const isMutation = req.body.query.startsWith('mutation');

  const user = req.user ? { ...req.user, id: req.user.uid } : null;
  const scopes = pathOr<string>('', ['user', 'scope'], req).split(' ');

  const session = driver.session();
  let cachedGroupId: string;
  const getGroupId = async () =>
    cachedGroupId || user
      ? session.readTransaction(async tx => {
          const result = await tx.run(
            `
    MATCH (:User{id: $userId})-[:MEMBER_OF]->(group:Group)
    RETURN group {.id}
    `,
            { userId: user && user.id },
          );
          if (result.records.length && result.records[0].get('group')) {
            cachedGroupId = result.records[0].get('group').id;
            return cachedGroupId;
          }
          return null;
        })
      : null;
  const storeGroupId = (groupId: string) => {
    cachedGroupId = groupId;
  };
  const getPurchasedIngredientLoader = async () => {
    const groupId = await getGroupId();
    if (groupId) {
      const loader = firestore.purchaseLists.createIngredientLoader(groupId);
      return loader;
    } else {
      return null;
    }
  };

  const context: Context = {
    neo4jDriver: driver,
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
    firebase,
    planning,
    gcloudStorage,
    scanning,

    getPurchasedIngredientLoader,

    user,
    scopes,
    getGroupId,
    storeGroupId,

    cypherContext: {
      userId: user && user.id,
    },
  };

  return context;
};
