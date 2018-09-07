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

/**
 * 7 Converting HTML to other formats

7.1 JSON

Given a list of nodes nodes in a Document, a user agent must run the following algorithm to extract the microdata from those nodes into a JSON form:

Let result be an empty object.

Let items be an empty array.

For each node in nodes, check if the element is a top-level microdata item, and if it is then get the object for that element and add it to items.

Add an entry to result called "items" whose value is the array items.

Return the result of serializing result to JSON in the shortest possible way (meaning no whitespace between tokens, no unnecessary zero digits in numbers, and only using Unicode escapes in strings for characters that do not have a dedicated escape sequence), and with a lowercase "e" used, when appropriate, in the representation of any numbers. [JSON]

This algorithm returns an object with a single property that is an array, instead of just returning an array, so that it is possible to extend the algorithm in the future if necessary.

When the user agent is to get the object for an item item, optionally with a list of elements memory, it must run the following substeps:

Let result be an empty object.

If no memory was passed to the algorithm, let memory be an empty list.

Add item to memory.

If the item has any item types, add an entry to result called "type" whose value is an array listing the item types of item, in the order they were specified on the itemtype attribute.

If the item has a global identifier, add an entry to result called "id" whose value is the global identifier of item.

Let properties be an empty object.

For each element element that has one or more property names and is one of the properties of the item item, in the order those elements are given by the algorithm that returns the properties of an item, run the following substeps:

Let value be the property value of element.

If value is an item, then: If value is in memory, then let value be the string "ERROR". Otherwise, get the object for value, passing a copy of memory, and then replace value with the object returned from those steps.

For each name name in element's property names, run the following substeps:

If there is no entry named name in properties, then add an entry named name to properties whose value is an empty array.

Append value to the entry named name in properties.

Add an entry to result called "properties" whose value is the object properties.

Return result.
 */

const getMicrodata = () => {
  const items = [];
  document.querySelectorAll('[itemscope]').forEach(function(el, i) {
    var item = {
      type: [el.getAttribute('itemtype')],
      properties: {},
    };
    var props = el.querySelectorAll('[itemprop]');
    props.forEach(function(prop) {
      const propVal = prop.getAttribute('itemprop');
      item.properties[propVal] = item.properties[propVal] || [];
      item.properties[propVal].push(getPropValue(prop));

      if (prop.matches('[itemscope]') && prop.matches('[itemprop]')) {
        var _item = {
          type: [prop.getAttribute('itemtype')],
          properties: {},
        };
        prop.querySelectorAll('[itemprop]').forEach(function(_prop) {
          _item.properties[_prop.getAttribute('itemprop')] =
            _item.properties[_prop.getAttribute('itemprop')] || [];
          _item.properties[_prop.getAttribute('itemprop')].push(
            getPropValue(_prop),
          );
        });
        item.properties[prop.getAttribute('itemprop')] = [_item];
      }
    });
    items.push(item);
  });

  return items;
};
