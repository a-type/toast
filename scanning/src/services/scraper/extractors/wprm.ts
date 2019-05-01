import { Page } from 'puppeteer';

const wprm = async (page: Page) => {
  return await page.evaluate(() => {
    /**
     * All extraction code must go inside this block
     * to be sent to the browser.
     */

    function textContent(el) {
      return el && el.textContent;
    }

    function parseTime(el) {
      var text = textContent(el);

      if (!text) {
        return null;
      }

      text = text
        .replace('Prep Time:', '')
        .replace('Cook Time:', '')
        .replace('Total Time:', '');
      var hoursResult = /(\d+)\s+(hours?)/i.exec(text);
      var minsResult = /(\d+)\s+(minutes?)/i.exec(text);

      if (hoursResult || minsResult) {
        var hours = hoursResult && hoursResult[1];
        var mins = minsResult && minsResult[1];

        var duration = 'PT';
        if (hours) {
          duration += hours + 'H';
        }
        if (mins) {
          duration += mins + 'M';
        }
        return duration;
      }
    }

    var wprmRoot = document.querySelector('.wprm-recipe');
    if (!wprmRoot) {
      return null;
    }

    var titleElement = wprmRoot.querySelector('.wprm-recipe-name');
    var authorElement = wprmRoot.querySelector('.wprm-recipe-author');
    var prepTimeElement = wprmRoot.querySelector(
      '.wprm-recipe-prep-time-container',
    );
    var cookTimeElement = wprmRoot.querySelector(
      '.wprm-recipe-cook-time-container',
    );
    var totalTimeElement = wprmRoot.querySelector(
      '.wprm-recipe-total-time-container',
    );
    var servingsElement = wprmRoot.querySelector('.wprm-recipe-servings');
    var ingredientsList = wprmRoot.querySelectorAll('.wprm-recipe-ingredient');
    var stepsList = wprmRoot.querySelectorAll('.wprm-recipe-instruction');
    var imageElement = wprmRoot.querySelector('.wprm-recipe-image img');

    var ingredientsText = [];
    ingredientsList.forEach(function(el) {
      var amount = el.querySelector('.wprm-recipe-ingredient-amount');
      var unit = el.querySelector('.wprm-recipe-ingredient-unit');
      var name = el.querySelector('.wprm-recipe-ingredient-name');
      var notes = el.querySelector('.wprm-recipe-ingredient-notes');

      var text =
        '' +
        (textContent(amount) || '') +
        ' ' +
        (textContent(unit) || '') +
        ' ' +
        (textContent(name) || '') +
        ' ' +
        (notes ? '(' + textContent(notes) + ')' : '');
      ingredientsText.push(text.trim());
    });

    var stepsText = [];
    stepsList.forEach(function(el) {
      stepsText.push(textContent(el));
    });

    var prepTime = parseTime(prepTimeElement);
    var cookTime = parseTime(cookTimeElement);
    var totalTime = parseTime(totalTimeElement);

    return {
      name: textContent(titleElement),
      author: textContent(authorElement),
      image: imageElement && imageElement.getAttribute('data-lazy-srcset'),
      prepTime: prepTime,
      cookTime: cookTime,
      totalTime: totalTime,
      recipeYield: textContent(servingsElement),
      recipeIngredient: ingredientsText,
      recipeInstructions: stepsText,
      copyrightHolder: textContent(authorElement),
    };
  });
};

export default wprm;
