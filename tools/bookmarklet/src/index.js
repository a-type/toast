import microdata from 'microdata';
import querystring from 'query-string';
import { toSeconds } from 'iso8601-duration';

const HOST = 'http://localhost:8080';

const run = () => {
  const data = microdata('http://schema.org/Recipe')[0];
  console.info(data);
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

  const query = {
    ttl: data.name.trim(),
    dsc: data.description.trim(),
    img: data.image,
    att: data.author.trim() + ' on ' + sitename,
    aut: data.author,
    cph: data.copyrightHolder,
    cpy: data.copyrightYear,
    src: data.url || window.location.href,
    ing: data.recipeIngredient.map(line => line.trim()),
    srv: data.recipeYield,
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

  const url = HOST + '/recipes/link?' + querystring.stringify(filteredQuery);
  window.open(url, '_blank');
};

run();
