module.exports = {
  port: process.env.PORT,
  security: {
    tokenSecret: process.env.JWT_TOKEN_SECRET,
    masterEmail: 'toastmaster@toastcooking.app',
    masterPassword: process.env.TOAST_MASTER_PASSWORD,
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
  recipeScraper: {
    endpoint:
      'https://us-central1-toast-cooking-0.cloudfunctions.net/scrapeRecipe',
    secret: process.env.RECIPE_SCRAPER_SECRET,
  },
};
