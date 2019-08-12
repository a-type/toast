module.exports = {
  port: process.env.PORT,
  cors: {
    allowedOrigins: ['https://toastcooking.app'],
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
