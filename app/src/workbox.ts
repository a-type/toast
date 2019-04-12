import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/service-worker.js');

  wb.addEventListener('message', event => {
    if (event.data.type === 'CACHE_UPDATE') {
      const { updatedURL } = event.data.payload;

      console.log(`A newer version of ${updatedURL} is available!`);
    }
  });

  wb.register()
    .then(() => {
      console.log('ServiceWorker registered');
    })
    .catch(err => {
      console.warn('ServiceWorker registration failed', err);
    });
}
