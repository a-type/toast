import gql from 'graphql-tag';

const actionFragment = gql`
  fragment CalendarPlanAction on PlanAction {
    id
    type
    ... on PlanActionCook {
      servings
      mealType
      recipe {
        id
        title
        coverImage {
          id
          url
        }
      }
    }
    ... on PlanActionEat {
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
