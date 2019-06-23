import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';

firebase.initializeApp(CONFIG.firebase);
firebase.messaging().usePublicVapidKey(CONFIG.pushCertPublicKey);

export default firebase;
