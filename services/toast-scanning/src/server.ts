import { scrapeRecipe, parseIngredients, linkRecipe } from './functions';
import { server, Route } from 'toast-common';

const routes: Route[] = [
  {
    method: 'post',
    path: '/scrapeRecipe',
    handler: scrapeRecipe,
  },
  {
    method: 'post',
    path: '/parseIngredients',
    handler: parseIngredients,
  },
  {
    method: 'post',
    path: '/linkRecipe',
    handler: linkRecipe,
  },
];

server(routes, { defaultPort: 3002 });
