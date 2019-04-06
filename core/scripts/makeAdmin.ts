import firebase from 'firebase-admin';
import config from 'config';

const uid = process.argv.pop();

if (uid === 'make-admin') {
  console.error('Supply a param for userid');
  process.exit(1);
}

firebase.initializeApp({
  credential: firebase.credential.cert(
    config['firebase'].serviceAccountKeyFile,
  ),
  databaseURL: config['firebase'].databaseURL,
});

firebase
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
