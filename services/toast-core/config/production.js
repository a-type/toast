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
    projectId: 'toast-cooking',
    storage: {
      bucket: 'toast-prod-media',
      directories: {
        images: 'images',
      },
    },
  },
  planning: {
    host: 'https://toast-planning-q6mtovqfhq-uc.a.run.app',
  },
  scanning: {
    host: 'https://toast-scanning-q6mtovqfhq-uc.a.run.app',
  },
};
