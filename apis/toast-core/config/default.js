module.exports = {
  port: process.env.PORT || 4000,
  security: {
    tokenSecret: process.env.JWT_TOKEN_SECRET || 'notsecret'
  },
  database: {
    neo4j: {
      endpoint: process.env.NEO4J_BOLT_HOST || 'bolt://localhost:7687',
      user: process.env.NEO4J_USERNAME || 'neo4j',
      password: process.env.NEO4J_PASSWORD || 'toast'
    }
  },
  aws: {
    accessKeyId: process.env.TOAST_AWS_ACCESS_KEY,
    secretAccessKey: process.env.TOAST_AWS_SECRET_KEY,
    s3: {
      bucket: 'toast-local-media',
      directories: {
        images: 'images'
      }
    }
  },
  gcloud: {
    projectId: process.env.GCLOUD_PROJECT_ID,
    storage: {
      bucket: process.env.GCLOUD_MEDIA_BUCKET || 'toast-local-media',
      directories: {
        images: 'images'
      }
    }
  }
};
