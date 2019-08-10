import { getArangoDb } from 'toast-common';
import { pathOr } from 'ramda';
import gcloudStorage from 'services/gcloudStorage';
import scanning from 'services/scanning';
import firebase from 'services/firebase';
import { auth } from 'firebase-admin';
import { Database } from 'arangojs';

export type Context = {
  arangoDb: Database;
  firebase: typeof firebase;
  gcloudStorage: typeof gcloudStorage;
  scanning: typeof scanning;
  user: auth.DecodedIdToken & { id: string };
  scopes: string[];
  arangoContext: {
    userId: string;
  };
};

export const createContext = async (req): Promise<Context> => {
  const user = req.user ? { ...req.user, id: req.user.uid } : null;
  const scopes = pathOr<string>('', ['user', 'scope'], req).split(' ');

  const arangoDb = await getArangoDb();

  const context: Context = {
    arangoDb,

    firebase,
    gcloudStorage,
    scanning,

    user,
    scopes,

    arangoContext: {
      userId: user && user.id,
    },
  };

  return context;
};
