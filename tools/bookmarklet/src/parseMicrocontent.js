const getPropValue = el => {
  const value =
    el.getAttribute('value') ||
    el.getAttribute('content') ||
    el.textContent ||
    el.src ||
    el.url;
  if (value) {
    return value.trim();
  }

  return null;
};

export default () => {
  const microdata = getMicrodata();
  console.info(microdata);

  const recipeScope = document.querySelector(
    '[itemscope][itemtype="http://schema.org/Recipe"]',
  );

  const props = [].slice.call(recipeScope.querySelectorAll('[itemprop]'));

  const title = getPropValue(recipeScope.querySelector('[itemprop="name"]'));
  const description = getPropValue(
    recipeScope.querySelector('[itemprop="description"]'),
  );

  const ingredients = props
    .filter(prop => {
      const type = prop.getAttribute('itemprop');
      return ['ingredients', 'recipeIngredient'].includes(type);
    })
    .map(getPropValue);

  const instructionList = props.find(
    prop => prop.getAttribute('itemprop') === 'recipeInstructions',
  );
  const instructions = [].slice
    .call(instructionList.querySelectorAll('li'))
    .map(getPropValue);

  const image = getPropValue(recipeScope.querySelector('[itemprop="image"]'));
  const url = getPropValue(recipeScope.querySelector('[itemprop="url"]'));

  console.info(title, description, url, ingredients, instructions, image);
};

const getMicrodata = () => {
  const items = [];
  document.querySelectorAll('[itemscope]').forEach(function(el, i) {
    var item = {
      type: [el.getAttribute('itemtype')],
      properties: {},
    };
    var props = el.querySelectorAll('[itemprop]');
    props.forEach(function(prop) {
      item.properties[prop.getAttribute('itemprop')] = [
        prop.content || prop.textContent || prop.src,
      ];
      if (prop.matches('[itemscope]') && prop.matches('[itemprop]')) {
        var _item = {
          type: [prop.getAttribute('itemtype')],
          properties: {},
        };
        prop.querySelectorAll('[itemprop]').forEach(function(_prop) {
          _item.properties[_prop.getAttribute('itemprop')] = [
            _prop.content || _prop.textContent || _prop.src,
          ];
        });
        item.properties[prop.getAttribute('itemprop')] = [_item];
      }
    });
    items.push(item);
  });

  return items;
};
