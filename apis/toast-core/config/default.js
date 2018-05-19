module.exports = {
  port: 4000,
  security: {
    tokenSecret: 'notsecret'
  },
  database: {
    neo4j: {
      endpoint: process.env.TOAST_DEV_DB_BOLT || 'bolt://localhost:7687',
      user: process.env.TOAST_DEV_DB_USER || 'neo4j',
      password: process.env.TOAST_DEV_DB_PW || 'toast'
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
  }
};
