import { gql } from 'apollo-boost';

export const Basic = gql`
  query RecipeBasic($id: ID!) {
    recipe(input: { id: $id }) {
      id
      title
      description
      author {
        id
        name
      }
    }
  }
`;

export const RecipeIngredients = gql`
  query RecipeIngredients($id: ID!) {
    recipe(input: { id: $id }) {
      id
      ingredients {
        unit
        unitValue
        index
        ingredient {
          id
          name
        }
      }
    }
  }
`;

export const Steps = gql`
  query RecipeSteps($id: ID!) {
    recipe(input: { id: $id }) {
      id
      steps {
        id
        text
        index
      }
    }
  }
`;

export const Full = gql`
  query RecipeFull($id: ID!) {
    recipe(input: { id: $id }) {
      id
      title
      description
      author {
        id
        name
      }
      ingredients {
        id
        unit
        unitValue
        index
        ingredient {
          id
          name
        }
      }
      steps {
        id
        text
        index
      }
      coverImage {
        id
        url
      }
    }
  }
`;
