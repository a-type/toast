import gql from 'graphql-tag';

const cookActionFragment = gql`
  fragment CalendarMealCookAction on MealActionCook {
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
`;

const eatActionFragment = gql`
  fragment CalendarMealEatAction on MealActionEat {
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
`;

const actionFragment = gql`
  fragment CalendarMealAction on MealAction {
    id
    type
    ...CalendarMealCookAction
    ...CalendarMealEatAction
  }

  ${cookActionFragment}
  ${eatActionFragment}
`;

export default actionFragment;
