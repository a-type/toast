# toast-scanning

Services for scraping recipe data and parsing ingredients

## Functions

### Link Recipe

`POST /linkRecipe`

```json
{
  "sourceUrl": "http://recipe/url",
  "userId": "user-id"
}
```

The main function, it scrapes a recipe by URL, parses the ingredients, and generates a linked recipe in the database tied to the user. Will exit early if the recipe has already been linked by someone else.

### Scrape Recipe

`POST /scrapeRecipe`

```json
{
  "sourceUrl": "http://recipe/url"
}
```

Only scrapes a recipe by URL, returning the raw data.

### Parse Ingredients

`POST /parseIngredients`

```json
{
  "ingredients": ["1 tbsp butter", "..."]
}
```

Maps a list of ingredient strings to parsed versions:

```json
{
  "original": "string",
  "ingredient": {
    "raw": "string",
    "normalized": "string",
    "range": [0, 15]
  },
  "unit": {
    "raw": "string",
    "normalized": "string",
    "range": [3, 20]
  },
  "value": {
    "raw": "string",
    "normalized": 32.3,
    "range": [19, 32]
  },
  "comments": ["strings"],
  "preparations": ["strings"]
}
```
