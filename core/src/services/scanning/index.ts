import config from 'config';
import fetch from 'node-fetch';

export type LinkResult = {
  recipeId: string;
  problems: string[];
};

export default {
  linkRecipe: async (
    sourceUrl: string,
    userId: string,
  ): Promise<LinkResult> => {
    const response = await fetch(config.scanning.host + '/linkRecipe', {
      method: 'POST',
      body: JSON.stringify({
        sourceUrl,
        userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();
    return body;
  },
};
