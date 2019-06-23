import fb from 'firebase-admin';

console.info(`Firebase Project ID: `, process.env.GCLOUD_PROJECT_ID);

fb.initializeApp({
  projectId: process.env.GCLOUD_PROJECT_ID,
});

export const firebase = fb;
