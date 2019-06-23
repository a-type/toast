import { checkoutCompleted } from './functions';
import { server, Route } from 'toast-common';

const routes: Route[] = [
  {
    method: 'post',
    path: '/checkoutCompleted',
    handler: checkoutCompleted,
  },
];

server(routes, { defaultPort: 3003 });
