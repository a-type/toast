// @flow
import React from 'react';
import Ingredients from './Ingredients';
import Steps from './Steps';
import Details from './Details';
import Layout from 'components/recipes/common/Layout';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { pathOr } from 'ramda';
import { type Recipe, type RecipeIngredient, type Step } from 'types';

const FullRecipeQuery = gql`
  query FullRecipeQuery($id: ID!) {
    recipe(id: $id) {
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
        note
        index
        ingredient {
          id
          name
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
  }
`;

export type QueryResponse = {
  loading: boolean,
  error: string | null,
  data: {
    recipe: Recipe,
  },
  refetch(): any,
};

type Props = {
  recipeId: string,
};

export default class RecipeView extends React.PureComponent<Props> {
  render() {
    const { recipeId } = this.props;

    return (
      <Query query={FullRecipeQuery} variables={{ id: recipeId }}>
        {(response: QueryResponse) => (
          <Layout loading={response.loading}>
            {!response.loading && (
              <React.Fragment>
                <Layout.Header>
                  <Layout.Header.CoverImage
                    imageSrc={pathOr(
                      null,
                      ['data', 'recipe', 'coverImage', 'url'],
                      response,
                    )}
                  />
                </Layout.Header>
                <Layout.Details>
                  <Details
                    recipe={pathOr(null, ['data', 'recipe'], response)}
                  />
                </Layout.Details>
                <Layout.Ingredients>
                  <Ingredients
                    ingredients={pathOr(
                      [],
                      ['data', 'recipe', 'ingredients'],
                      response,
                    )}
                  />
                </Layout.Ingredients>
                <Layout.Steps>
                  <Steps
                    steps={pathOr([], ['data', 'recipe', 'steps'], response)}
                  />
                </Layout.Steps>
              </React.Fragment>
            )}
          </Layout>
        )}
      </Query>
    );
  }
}
