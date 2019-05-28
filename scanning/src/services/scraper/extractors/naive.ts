import { Page } from 'puppeteer';

const naive = async (page: Page) => {
  console.log('trying naive');
  return await page.evaluate(() => {
    /**
     * All extraction code must go inside this block
     * to be sent to the browser.
     */

    function textContent(el) {
      return el && el.textContent;
    }

    function toIsoDuration(minsString) {
      if (!minsString) {
        return null;
      }

      var hoursResult = /(\d+)\s+(h(ou)?r?s?)/.exec(minsString);
      var minutesResult = /(\d+)\s+(m(in)?(ute)?s?)/i.exec(minsString);

      if (hoursResult || minutesResult) {
        var hours = hoursResult && hoursResult[1];
        var mins = minutesResult && minutesResult[1];

        var duration = 'PT';
        if (hours) {
          duration += hours + 'H';
        }
        if (mins) {
          duration += mins + 'M';
        }
        return duration;
      }

      return null;
    }

    function toYield(yieldStr) {
      if (!yieldStr) {
        return null;
      }
      return parseInt(yieldStr.replace('servings', ''));
    }

    function findFirstMatch(selectors) {
      for (var i = 0; i < selectors.length; i++) {
        var el = document.querySelector(selectors[i]);
        if (el) {
          return el;
        }
      }
      return null;
    }

    function findFirstMatches(selectors) {
      for (var i = 0; i < selectors.length; i++) {
        var els = document.querySelectorAll(selectors[i]);
        if (els && els.length) {
          return els;
        }
      }
      return null;
    }

    var titleElement = findFirstMatch(['#title', '.title', '.recipe h1', 'h1']);
    var authorElement = findFirstMatch([
      '.recipe .author',
      '.recipe [class*="author"]',
      '.author',
      '[class*="author"',
    ]);
    var prepTimeElement = findFirstMatch([
      '.recipe .prep-time',
      '.recipe .prepTime',
      '.recipe [class*="prep"][class*="time"]',
      '.prep-time',
      '.prepTime',
    ]);
    var cookTimeElement = findFirstMatch([
      '.recipe .cook-time',
      '.recipe .cookTime',
      '.recipe [class*="cook"][class*="time"]',
      '.cook-time',
      '.cookTime',
    ]);
    var totalTimeElement = findFirstMatch([
      '.recipe .total-time',
      '.recipe .totalTime',
      '.recipe [class*="total"][class*="time"]',
      '.total-time',
      '.totalTime',
    ]);
    var servingsElement = findFirstMatch([
      '.recipe .servings',
      '.recipe [class*="servings"]',
      '.servings',
      '[class*="servings"]',
    ]);
    var ingredientsList = findFirstMatches([
      '.recipe .ingredients .ingredient',
      '.ingredients .ingredient',
      'li.ingredient',
      'ul.ingredients li',
      '.ingredients > *',
    ]);
    var instructionsList = findFirstMatches([
      '.recipe .instructions .instruction',
      '.recipe .steps .step',
      '.instructions .instruction',
      '.steps .step',
      'li.instruction',
      'li.step',
      'ul.instructions li',
      'ul.steps li',
      '.instructions > *',
      '.steps > *',
    ]);
    var imageElement = findFirstMatch([
      '.recipe img.image',
      '.recipe img[class*="image"]',
      '.recipe img',
      'img',
    ]);

    var ingredientsText = [];
    (ingredientsList || []).forEach(function(el) {
      ingredientsText.push(textContent(el));
    });

    var stepsText = [];
    (instructionsList || []).forEach(function(el) {
      stepsText.push(textContent(el));
    });

    var prepTime = toIsoDuration(textContent(prepTimeElement));
    var cookTime = toIsoDuration(textContent(cookTimeElement));
    var totalTime = toIsoDuration(textContent(totalTimeElement));

    var data = {
      name: textContent(titleElement),
      author: textContent(authorElement),
      image: imageElement && imageElement.getAttribute('src'),
      prepTime: prepTime,
      cookTime: cookTime,
      totalTime: totalTime,
      recipeYield: toYield(textContent(servingsElement)),
      recipeIngredient: ingredientsText,
      recipeInstructions: stepsText,
      copyrightHolder: textContent(authorElement),
    };

    return data;
  });
};

export default naive;
