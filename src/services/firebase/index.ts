import firebase from 'firebase';

firebase.initializeApp(CONFIG.firebase);
firebase.messaging().usePublicVapidKey(CONFIG.pushCertPublicKey);

export default firebase;
