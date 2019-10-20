import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import config from '../config/config';

if (typeof window !== 'undefined') {
  firebase.initializeApp(config.firebase);
  firebase.messaging().usePublicVapidKey(config.pushCertPublicKey);
}

export default firebase;
