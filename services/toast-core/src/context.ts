import { neo4j } from 'toast-common';
import { pathOr } from 'ramda';
import firestore from 'services/firestore';
import { TransactionFunction } from 'types';
import planning from 'services/planning';
import gcloudStorage from 'services/gcloudStorage';
import scanning from 'services/scanning';
import firebase from 'services/firebase';
import { auth } from 'firebase-admin';
import DataLoader from 'dataloader';
import { PurchaseListItem } from 'models/PurchaseList';

export type Context = {
  neo4jDriver: typeof neo4j;
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

  let cachedGroupId: string;
  const getGroupId = async () => {
    if (cachedGroupId) {
      return cachedGroupId;
    }

    if (!user) {
      return null;
    }

    const session = neo4j.session();
    let result: string;

    try {
      result = await session.readTransaction(async tx => {
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
      });
    } finally {
      session.close();
    }

    return result;
  };
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
    neo4jDriver: neo4j,
    // interop / legacy
    transaction: txFunction => {
      const sess = neo4j.session();
      if (isMutation) {
        return sess.writeTransaction(txFunction);
      } else {
        return sess.readTransaction(txFunction);
      }
    },
    writeTransaction: txFunction => {
      const sess = neo4j.session();
      return sess.writeTransaction(txFunction);
    },
    readTransaction: txFunction => {
      const sess = neo4j.session();
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
