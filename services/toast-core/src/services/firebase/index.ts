import firebase from 'firebase-admin';
import config from 'config';
import { logger } from 'toast-common';

logger.info('Firebase URL: ', config.firebase.databaseURL);

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_FILE) {
  // local environments must configure with a service account vs. ambient credentials in cloud
  logger.info(`Firebase: Authenticating via service account credential`);
  firebase.initializeApp({
    credential: firebase.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_FILE),
    projectId: process.env.GCLOUD_PROJECT_ID
  })
} else {
  firebase.initializeApp({
    //credential: firebase.credential.cert(config.firebase.serviceAccountKeyFile),
    databaseURL: config.firebase.databaseURL,
    projectId: config.gcloud.projectId,
  });
}

export default firebase;
