import microdata from './extractors/microdata';
import { toSeconds, parse } from 'iso8601-duration';
import { Page } from 'puppeteer';
import tasty from './extractors/tasty';
import kitchenStories from './extractors/kitchenStories';
import wprm from './extractors/wprm';
import naive from './extractors/naive';
import { URL } from 'url';

const extractNumber = (numberOrString: number | string) => {
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

const toArray = (data: string | string[]): string[] => {
  if (!data) {
    return [];
  }
  if (data instanceof Array) {
    return data;
  }
  return data.split(/\n/);
};

const collapseWhitespace = (line: string, pattern = /\t|\n/g) => {
  return line
    .trim()
    .replace(pattern, ' ')
    .replace(/\s+/g, ' ');
};

const filterIngredients = (ingredient: string) => !/^\w+:$/.test(ingredient);
const filterSteps = (step: string) => step.trim() !== '';
const isoToMinutes = (isoDuration: string) => {
  if (!isoDuration || !isoDuration.startsWith('P')) {
    return 0;
  }
  try {
    const parsed = parse(isoDuration);
    return Math.floor(toSeconds(parsed) / 60);
  } catch (err) {
    return 0;
  }
};

const parsers: [string, (page: Page) => any][] = [
  ['kitchenstories', kitchenStories],
  ['*', microdata],
  ['*', tasty],
  ['*', wprm],
  ['*', naive],
];
const tryParseOrFallback = async (page: Page) => {
  for (let [match, parser] of parsers) {
    if (match === '*' || page.url().includes(match)) {
      const data = await parser(page);
      if (data && data.recipeIngredient && data.recipeIngredient.length) {
        return data;
      }
    }
  }
  return {};
};

const getSiteName = async (page: Page) => {
  try {
    const name = await page.$eval(
      'meta[property="og:site_name"]',
      sitenameMeta => {
        return sitenameMeta
          ? sitenameMeta.getAttribute('content')
          : window.location.hostname;
      },
    );
  } catch (err) {
    console.warn(err);
    return new URL(page.url()).hostname;
  }
};

const run = async (page: Page) => {
  const data = await tryParseOrFallback(page);

  console.info('Extracted data:');
  console.info(JSON.stringify(data));

  const sitename = await getSiteName(page);

  const cookMinutes = isoToMinutes(data.cookTime);
  const prepMinutes = isoToMinutes(data.prepTime);
  const totalMinutes = isoToMinutes(data.totalTime);
  const unaccountedForTime = totalMinutes - prepMinutes - cookMinutes;

  const nutrition = data.nutrition || {};

  const servings = extractNumber(data.recipeYield);

  const ingredients: string[] = toArray(data.recipeIngredient)
    .map(l => collapseWhitespace(l))
    .filter(filterIngredients);

  const steps: string[] = toArray(data.recipeInstructions)
    .map((line: string) => collapseWhitespace(line, /\t/g))
    .filter(filterSteps);

  const extracted = {
    title: data.name && data.name.trim(),
    description: data.description && data.description.trim(),
    image: data.image,
    attribution: data.author && data.author.trim() + ' on ' + sitename,
    author: data.author,
    copyrightHolder: data.copyrightHolder,
    copyrightYear: data.copyrightYear,
    source: data.url || page.url(),
    ingredients: ingredients,
    servings: servings,
    cookTimeMinutes: cookMinutes || totalMinutes,
    prepTimeMinutes:
      prepMinutes ||
      (totalMinutes > cookMinutes ? cookMinutes - totalMinutes : 0),
    unaccountedForTimeMinutes: unaccountedForTime > 30 ? unaccountedForTime : 0,
    nutrition,
    steps,

    rawData: data,
  };

  return extracted;
};

export default run;
