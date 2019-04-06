module.exports = {
  port: process.env.PORT,
  cors: {
    allowedOrigins: ['https://toastcooking.app'],
  },
  database: {
    neo4j: {
      endpoint: process.env.NEO4J_BOLT_HOST,
      user: process.env.NEO4J_USERNAME || 'neo4j',
      password: process.env.NEO4J_PASSWORD,
    },
  },
  gcloud: {
    projectId: process.env.GCLOUD_PROJECT_ID,
    storage: {
      bucket: process.env.GCLOUD_MEDIA_BUCKET,
      directories: {
        images: 'images',
      },
    },
  },
};
