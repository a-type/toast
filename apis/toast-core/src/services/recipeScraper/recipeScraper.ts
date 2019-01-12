import config from 'config';
import fetch from 'node-fetch';
import { stringify } from 'querystring';
import { Readable } from 'stream';
import mime from 'mime-types';
import { File } from 'types';
import logger from 'logger';

const authorization = `Bearer ${config.recipeScraper.secret}`;

export type ScrapeResult = {
  title: string;
  description: string;
  image: string;
  attribution: string;
  author: string;
  copyrightHolder: string;
  copyrightYear: string;
  source: string;
  ingredients: string[];
  servings: number;
  cookTimeMinutes: number;
  prepTimeMinutes: number;
  unaccountedForTimeMinutes: number;
  nutrition: {
    calories: string;
    fatContent: string;
    carbohydrateContent: string;
    proteinContent: string;
    cholesterolContent: string;
    sodiumContent: string;
  };
  steps: string[];
  rawData: any;
};

export default {
  scrape: async (url: string): Promise<ScrapeResult> => {
    const query = stringify({
      url,
    });
    const target = `${config.recipeScraper.endpoint}?${query}`;
    let response;
    try {
      response = await fetch(target, {
        headers: {
          authorization,
        },
      });

      const body = await response.json();

      return body;
    } catch (err) {
      logger.fatal(err);
      if (response) {
        logger.debug(response);
      }
      throw err;
    }
  },

  getImagePseudoFile: async (imageUrl: string): Promise<File> => {
    const response = await fetch(imageUrl);
    const filename = imageUrl.split('/').pop();
    const fileExt = filename.split('.').pop();
    const buffer = await response.buffer();
    const stream = new Readable();
    stream._read = () => {};
    stream.push(buffer);
    stream.push(null);

    return {
      stream,
      filename,
      mimetype: mime.lookup(fileExt),
    };
  },
};
