module.exports = {
  port: process.env.PORT || 4000,
  cors: {
    allowedOrigins: ['http://localhost:8080'],
  },
  gcloud: {
    projectId: process.env.GCLOUD_PROJECT_ID || 'toast-cooking-dev',
    storage: {
      bucket: process.env.GCLOUD_MEDIA_BUCKET || 'toast-local-media',
      directories: {
        images: 'images',
      },
    },
  },
  firebase: {
    serviceAccountKeyFile: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_FILE,
    databaseUrl: process.env.FIREBASE_DATABASE_URL,
    messagingServerKey: process.env.FIREBASE_MESSAGING_SERVER_KEY,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  },
  planning: {
    host: process.env.TOAST_PLANNING_HOST || 'http://localhost:3001',
  },
  scanning: {
    host: process.env.TOAST_SCANNING_HOST || 'http://localhost:3002',
  },
};
