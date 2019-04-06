import firebase from 'firebase-admin';
import config from 'config';

firebase.initializeApp({
  credential: firebase.credential.cert(config.firebase.serviceAccountKeyFile),
  databaseURL: config.firebase.databaseURL,
});

export default firebase;
