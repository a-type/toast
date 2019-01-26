module.exports = {
  port: process.env.PORT || 4000,
  database: {
    neo4j: {
      endpoint: process.env.NEO4J_BOLT_HOST || 'bolt://localhost:7687',
      user: process.env.NEO4J_USERNAME || 'neo4j',
      password: process.env.NEO4J_PASSWORD || 'toast1',
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
  firebase: {
    serviceAccountKeyFile: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_FILE,
    databaseUrl: process.env.FIREBASE_DATABASE_URL,
    messagingServerKey: process.env.FIREBASE_MESSAGING_SERVER_KEY,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  },
  recipeScraper: {
    endpoint: process.env.RECIPE_SCRAPER_API_ENDPOINT,
    secret: process.env.RECIPE_SCRAPER_API_SECRET,
  },
  ingredientParser: {
    endpoint: process.env.INGREDIENT_PARSER_API_ENDPOINT,
    secret: process.env.INGREDIENT_PARSER_API_SECRET,
  },
};
