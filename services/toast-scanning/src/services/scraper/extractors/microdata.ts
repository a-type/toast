import { Page } from 'puppeteer';

const microdata = async (page: Page) => {
  console.log('trying microdata');

  return await page.evaluate(() => {
    /**
     * All extraction code must go inside this block
     * to be sent to the browser.
     */
    var lookup = {
      '*': 'textContent',
      meta: 'content',
      audio: 'src',
      embed: 'src',
      iframe: 'src',
      img: 'src',
      source: 'src',
      video: 'src',
      a: 'href',
      area: 'href',
      link: 'href',
      object: 'data',
      time: 'datetime',
    };

    function extract(scope) {
      var obj = { _type: scope.getAttribute('itemtype') },
        elems = [].slice.call(scope.children),
        elem,
        key;

      /*jshint boss:true*/
      while ((elem = elems.shift())) {
        if ((key = elem.getAttribute('itemprop'))) add(obj, key, value(elem));
        if (elem.getAttribute('itemscope') === null)
          prepend(elems, elem.children);
      }

      return obj;
    }

    function add(obj, key, val) {
      /*jshint eqnull:true*/
      if (val == null) return;

      var prop = obj[key];
      if (prop == null) obj[key] = val;
      else if (prop instanceof Array) prop.push(val);
      else obj[key] = [prop, val];
    }

    function value(elem) {
      if (elem.getAttribute('itemscope') !== null) return extract(elem);
      var attr = lookup[elem.tagName.toLowerCase()] || lookup['*'];
      return elem[attr] || elem.getAttribute(attr);
    }

    function prepend(target, addition) {
      [].unshift.apply(target, [].slice.call(addition));
    }

    var elems = document.querySelectorAll(
      '[itemscope][itemtype="http://schema.org/Recipe"]',
    );
    if (elems.length === 0) {
      elems = document.querySelectorAll(
        '[itemscope][itemtype="https://schema.org/Recipe"]',
      );
    }
    var arr = [];
    for (var i = 0, len = elems.length; i < len; i++)
      arr.push(extract(elems[i]));

    return arr[0];
  });
};

export default microdata;
