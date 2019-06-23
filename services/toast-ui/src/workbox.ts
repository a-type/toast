import { Workbox } from 'workbox-window';

let wb: Workbox = null;

if ('serviceWorker' in navigator) {
  wb = new Workbox('/service-worker.js');

  wb.register()
    .then(() => {
      console.log('ServiceWorker registered');
    })
    .catch(err => {
      console.warn('ServiceWorker registration failed', err);
    });
}

export default wb;
