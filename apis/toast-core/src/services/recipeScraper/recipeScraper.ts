import config from 'config';
import fetch from 'node-fetch';
import { stringify } from 'querystring';
import { Readable } from 'stream';
import mime from 'mime-types';
import { File } from 'types';

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
    const result = await fetch(target, {
      headers: {
        authorization,
      },
    });

    const body = await result.json();

    return body;
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
