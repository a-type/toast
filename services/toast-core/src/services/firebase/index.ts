import firebase from 'firebase-admin';
import config from 'config';
import { logger } from 'toast-common';

logger.info('Firebase URL: ', config.firebase.databaseURL);

firebase.initializeApp({
  //credential: firebase.credential.cert(config.firebase.serviceAccountKeyFile),
  databaseURL: config.firebase.databaseURL,
  projectId: config.gcloud.projectId,
});

export default firebase;
