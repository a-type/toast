import parser from '../services/parser';

export default async (req, res) => {
  const { ingredients } = req.body;
  console.info(`Parsing: ${JSON.stringify(ingredients)}`);

  res.send(ingredients.map(parser));
};
