import { Workbox } from 'workbox-window';

let wb: Workbox = null;
let resolve: (reg: ServiceWorkerRegistration) => any;
export const registrationPromise = new Promise<ServiceWorkerRegistration>(
  res => {
    resolve = res;
  },
);

if ('serviceWorker' in navigator) {
  wb = new Workbox('/service-worker.js');

  wb.register()
    .then(reg => {
      console.log('ServiceWorker registered');
      resolve(reg);
    })
    .catch(err => {
      console.warn('ServiceWorker registration failed', err);
    });
}

export default wb;
