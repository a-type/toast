import scrape from '../services/scraper';

export default async (req, res) => {
  const url = req.body.sourceUrl;
  console.info(`Request to scrape: ${url}`);
  const result = await scrape(url);
  res.send(result);
};
