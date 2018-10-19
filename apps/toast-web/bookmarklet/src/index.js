import microdata from './microdata';
import querystring from 'query-string';
import { toSeconds } from 'iso8601-duration';
import sendToFrame from './sendToFrame';

const ORIGIN = CONFIG.origin;

const extractNumber = numberOrString => {
  if (typeof numberOrString === 'number') {
    return numberOrString;
  }

  if (typeof numberOrString === 'string') {
    const match = /(\d+)/.exec(numberOrString);
    if (match[1]) {
      return parseInt(match[1]);
    }
  }

  return undefined;
};

const filterIngredients = ingredient => !/^\w+:$/.test(ingredient);

const run = async () => {
  const data = microdata('http://schema.org/Recipe')[0];

  const sitenameMeta = document.head.querySelector(
    'meta[property="og:site_name"]',
  );
  const sitename = sitenameMeta
    ? sitenameMeta.getAttribute('content')
    : window.location.hostname;

  const cookMinutes = data.cookTime
    ? Math.floor(toSeconds(data.cookTime)) / 60
    : 0;
  const prepMinutes = data.prepTime
    ? Math.floor(toSeconds(data.prepTime)) / 60
    : 0;
  const totalMinutes = data.totalTime
    ? Math.floor(toSeconds(data.totalTime)) / 60
    : 0;
  const unaccountedForTime = totalMinutes - prepMinutes - cookMinutes;

  const nutrition = data.nutrition || {};

  const servings = extractNumber(data.recipeYield);

  const ingredients = data.recipeIngredient
    .map(line => line.trim().replace(/(\t|\n)/g, ' '))
    .filter(filterIngredients);

  const query = {
    ttl: data.name.trim(),
    dsc: data.description.trim(),
    img: data.image,
    att: data.author.trim() + ' on ' + sitename,
    aut: data.author,
    cph: data.copyrightHolder,
    cpy: data.copyrightYear,
    src: data.url || window.location.href,
    ing: ingredients,
    srv: servings,
    ctm: cookMinutes || totalMinutes,
    ptm:
      prepMinutes ||
      (totalMinutes > cookMinutes ? cookMinutes - totalMinutes : 0),
    utm: unaccountedForTime > 30 ? unaccountedForTime : 0,
    ncal: nutrition.calories,
    ncrb: nutrition.carbohydrateContent,
    nchl: nutrition.cholesterolContent,
    nfat: nutrition.fatContent,
    nfbr: nutrition.fiberContent,
    nprt: nutrition.proteinContent,
    nsft: nutrition.saturatedFatContent,
    nsvs: nutrition.servingSize,
    nsdm: nutrition.sodiumContent,
    nsgr: nutrition.sugarContent,
    ntft: nutrition.transFatContent,
    nuft: nutrition.unsaturatedFatContent,
  };

  const filteredQuery = Object.keys(query).reduce((filtered, key) => {
    if (query[key] !== undefined && query[key] !== null) {
      filtered[key] = query[key];
    }
    return filtered;
  }, {});

  // const url = HOST + '/recipes/link?' + querystring.stringify(filteredQuery);
  // window.open(url, '_blank');

  sendToFrame(filteredQuery, ORIGIN);
};

run()
  .then(() => {
    console.log('done');
  })
  .catch(console.error);
