import gql from 'graphql-tag';

const actionFragment = gql`
  fragment CalendarMealAction on MealAction {
    id
    type
    ... on MealActionCook {
      servings
      recipeType
      recipe {
        id
        title
        coverImage {
          id
          url
        }
      }
    }
    ... on MealActionEat {
      cookAction {
        id
        dayIndex
        recipe {
          id
          title
          coverImage {
            id
            url
          }
        }
      }
    }
  }
`;

export default actionFragment;
