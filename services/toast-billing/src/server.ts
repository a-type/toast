import { stripeWebhook } from './functions';
import { server, Route } from 'toast-common';

const routes: Route[] = [
  {
    method: 'post',
    path: '/checkoutCompleted',
    handler: stripeWebhook,
  },
];

server(routes, { defaultPort: 3003 });
