// @flow
import React from 'react';
import Details from './Details';
import Ingredients from './Ingredients';
import Steps from './Steps';
import TopControls from './TopControls';
import Layout from 'components/recipes/common/Layout';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { path } from 'ramda';

const dataFragment = gql`
  fragment RecipeData on Recipe {
    id
    title
    description
    ingredients {
      id
      index
      unit
      unitValue
      ingredient {
        id
        name
        description
      }
    }
    steps {
      id
      index
      step {
        id
        text
      }
    }
    coverImage {
      id
      url
    }
  }
`;

const Update = gql`
  mutation UpdateRecipe($id: ID!, $input: RecipeUpdateInput!) {
    updateRecipe(id: $id, input: $input) {
      ...RecipeData
    }
  }

  ${dataFragment}
`;

const Create = gql`
  mutation CreateRecipe($input: RecipeCreateInput!) {
    createRecipe(input: $input) {
      ...RecipeData
    }
  }

  ${dataFragment}
`;

const Get = gql`
  query GetFullRecipe($id: ID!) {
    recipe(id: $id) {
      ...RecipeData
    }
  }

  ${dataFragment}
`;

export type QueryResponse = {
  loading: boolean,
  error: string | null,
  recipe: Recipe,
  refetch(): any,
};

type UpdateMutation = {
  updateRecipe: Recipe,
};

type UpdateMutateFunction = (args: mixed) => Promise<UpdateMutation>;

type CreateMutation = {
  createRecipe: Recipe,
};

type CreateMutateFunction = (args: mixed) => Promise<CreateMutation>;

type Props = {
  recipeId: string,
  onCreate(recipe: Recipe): mixed,
};

export default class RecipeEditor extends React.PureComponent<Props> {
  renderEdit = (response: QueryResponse, update: MutateFunction) => {
    if (response.loading) {
      return <Layout loading={response.loading} />;
    }

    const { recipeId } = this.props;
    const updateDetails = ({ title, description }) =>
      update({
        variables: {
          id: recipeId,
          input: { title, description },
        },
      });
    const setIngredient = ({ id, unit, unitValue }) =>
      update({
        variables: {
          id: recipeId,
          input: {
            ingredients: { set: { id, ingredient: { unit, unitValue } } },
          },
        },
      });
    const pushIngredient = ({ unit, unitValue, ingredientId }) =>
      update({
        variables: {
          id: recipeId,
          input: {
            ingredients: { push: { unit, unitValue, ingredientId } },
          },
        },
      });
    const moveIngredient = ({ fromIndex, toIndex }) =>
      update({
        variables: {
          id: recipeId,
          input: {
            ingredients: { move: { fromIndex, toIndex } },
          },
        },
      });
    const pushStep = ({ text }) =>
      update({
        variables: { id: recipeId, input: { steps: { push: { text } } } },
      });
    const setStep = ({ id, text }) =>
      update({
        variables: {
          id: recipeId,
          input: { steps: { set: { id, step: { text } } } },
        },
      });
    const moveStep = ({ fromIndex, toIndex }) => ({
      variables: {
        id: recipeId,
        input: { steps: { move: { fromIndex, toIndex } } },
      },
    });

    return (
      <Layout loading={response.loading}>
        <Layout.Header>
          <Layout.Header.CoverImage
            imageSrc={path(['data', 'recipe', 'coverImage', 'url'], response)}
          />
          <Layout.Header.Controls>
            <TopControls recipe={path(['data', 'recipe'], response)} />
          </Layout.Header.Controls>
        </Layout.Header>
        <Layout.Details>
          <Details
            recipe={path(['data', 'recipe'], response)}
            onChange={updateDetails}
          />
        </Layout.Details>
        <Layout.Ingredients>
          <Ingredients
            ingredients={path(['data', 'recipe', 'ingredients'], response)}
            onSetIngredient={setIngredient}
            onPushIngredient={pushIngredient}
            onMoveIngredient={moveIngredient}
          />
        </Layout.Ingredients>
        <Layout.Steps>
          <Steps
            steps={path(['data', 'recipe', 'steps'], response)}
            onPushStep={pushStep}
            onSetStep={setStep}
            onMoveStep={moveStep}
          />
        </Layout.Steps>
      </Layout>
    );
  };

  renderCreate = create => {
    const updateDetails = ({ title, description }) =>
      create({
        variables: {
          input: {
            title,
            description,
          },
        },
      }).then(response => {
        console.info(response);
        this.props.onCreate(response.data.createRecipe);
      });

    return (
      <Layout>
        <Layout.Header>
          <Layout.Header.CoverImage />
        </Layout.Header>
        <Layout.Details>
          <Details
            recipe={{ title: '', description: '' }}
            onChange={updateDetails}
          />
        </Layout.Details>
        <Layout.Ingredients />
        <Layout.Steps />
      </Layout>
    );
  };

  render() {
    const { recipeId } = this.props;

    if (!recipeId) {
      return (
        <Mutation mutation={Create}>
          {(createRecipe: MutateFunction) => this.renderCreate(createRecipe)}
        </Mutation>
      );
    }

    return (
      <Query query={Get} variables={{ id: recipeId }} skip={!recipeId}>
        {(data: QueryResponse) => (
          <Mutation mutation={Update}>
            {(updateRecipe: MutateFunction) =>
              this.renderEdit(data, updateRecipe)
            }
          </Mutation>
        )}
      </Query>
    );
  }
}
