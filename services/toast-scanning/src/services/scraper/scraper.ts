import puppeteer from 'puppeteer';
import robotsParser from 'robots-txt-parser';
import extract from './extractor';
import filterResources from './filterResources';

const robots = robotsParser({
  userAgent: 'Googlebot',
  allowOnNeutral: true,
});

export default async (url: string) => {
  const processedUrl = url.replace(/\?.*/, '');

  const crawlable = await robots.canCrawl(processedUrl);
  if (!crawlable) {
    throw new Error('Website does not allow crawling');
  }

  const browser = await puppeteer.launch({
    headless: true,
    timeout: process.env.NODE_ENV === 'production' ? 60000 : 30000,
    args:
      process.env.NODE_ENV === 'production'
        ? [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-notifications',
            '--disable-offer-store-unmasked-wallet-cards',
            '--disable-offer-upload-credit-cards',
            '--enable-async-dns',
            '--enable-simple-cache-backend',
            '--enable-tcp-fast-open',
            '--no-default-browser-check',
            '--no-pings',
            '--prerender-from-omnibox=disabled',
          ]
        : [],
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  // filter non-critical requests to speed loading
  page.on('request', req => {
    if (filterResources(processedUrl, req)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(processedUrl);

  const data = await extract(page);

  await page.close();
  await browser.close();

  return {
    sourceUrl: processedUrl,
    ...data,
  };
};
