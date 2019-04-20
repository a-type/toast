import { Page } from 'puppeteer';

const kitchenStories = async (page: Page) => {
  return await page.evaluate(() => {
    function textContent(el) {
      return el && el.textContent;
    }

    function toIsoDuration(mins) {
      if (!mins || mins === NaN) {
        return null;
      }

      return 'PT' + mins + 'M';
    }

    var recipeRoot = document.querySelector('.content-recipe');

    if (!recipeRoot) {
      return null;
    }

    var title = recipeRoot.getAttribute('data-title');
    var authorElement = recipeRoot.querySelector('.author-information__name');
    var prepTimeElement = recipeRoot.querySelector(
      '.recipe-time > .col-1 > .time-cell',
    );
    var cookTimeElement = recipeRoot.querySelector(
      '.recipe-time > .col-2 > .time-cell',
    );
    var unattendedTimeElement = recipeRoot.querySelector(
      '.recipe-time > .col-3 > .time-cell',
    );
    var ingredientsList = recipeRoot.querySelectorAll('.ingredients tr');
    var stepsList = recipeRoot.querySelectorAll('.step > .text');
    var imageElement = document.querySelector('.page-header__image');
    var servingsElement = recipeRoot.querySelector('.stepper');

    var ingredientsText = [];
    ingredientsList.forEach(function(el) {
      var cells = el.querySelectorAll('td');
      var quantity = cells[0].getAttribute('data-amount') || '';
      var unit = cells[0].getAttribute('data-unit') || '';
      var ingredient = textContent(cells[1]) || '';
      ingredientsText.push(quantity + ' ' + unit + ' ' + ingredient);
    });

    var stepsText = [];
    stepsList.forEach(function(el) {
      stepsText.push(textContent(el));
    });

    var prepTimeMins = parseInt(prepTimeElement.getAttribute('data-time'));
    var cookTimeMins = parseInt(cookTimeElement.getAttribute('data-time'));
    var totalTimeMins =
      prepTimeMins +
      cookTimeMins +
      parseInt(unattendedTimeElement.getAttribute('data-time'));

    var data = {
      name: title,
      author: textContent(authorElement),
      image: imageElement && imageElement.getAttribute('src'),
      prepTime: toIsoDuration(prepTimeMins),
      cookTime: toIsoDuration(cookTimeMins),
      totalTime: toIsoDuration(totalTimeMins),
      recipeYield: servingsElement
        ? parseInt(servingsElement.getAttribute('data-value'))
        : 1,
      recipeIngredient: ingredientsText,
      recipeInstructions: stepsText,
      copyrightHolder: 'Kitchen Stories',
    };

    return data;
  });
};

export default kitchenStories;
