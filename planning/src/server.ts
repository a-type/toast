import { syncPlan, syncAll } from './functions';
import { server, Route } from 'toast-common';

const routes: Route[] = [
  {
    method: 'post',
    path: '/syncPlan',
    handler: syncPlan,
  },
  {
    method: 'post',
    path: '/syncAll',
    handler: syncAll,
  },
];

server(routes, { defaultPort: 3001 });
