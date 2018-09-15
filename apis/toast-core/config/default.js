module.exports = {
  port: process.env.PORT || 4000,
  security: {
    tokenSecret: process.env.JWT_TOKEN_SECRET || 'notsecret',
    masterEmail: 'toastmaster@toastcooking.app',
    masterPassword: 'INSECURE CHANGE THIS!',
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENTID,
    issuer: process.env.AUTH0_ISSUER,
    audience: process.env.AUTH0_AUDIENCE,
    clientSecret: process.env.AUTH0_CLIENTSECRET,
    apiClientId: process.env.AUTH0_API_CLIENTID,
    apiClientSecret: process.env.AUTH0_API_CLIENTSECRET,
  },
  database: {
    neo4j: {
      endpoint: process.env.NEO4J_BOLT_HOST || 'bolt://localhost:7687',
      user: process.env.NEO4J_USERNAME || 'neo4j',
      password: process.env.NEO4J_PASSWORD || 'toast1',
    },
  },
  aws: {
    accessKeyId: process.env.TOAST_AWS_ACCESS_KEY,
    secretAccessKey: process.env.TOAST_AWS_SECRET_KEY,
    s3: {
      bucket: 'toast-local-media',
      directories: {
        images: 'images',
      },
    },
  },
  gcloud: {
    projectId: process.env.GCLOUD_PROJECT_ID,
    storage: {
      bucket: process.env.GCLOUD_MEDIA_BUCKET || 'toast-local-media',
      directories: {
        images: 'images',
      },
    },
  },
  imageService: {
    host: 'http://localhost:9000',
  },
};
