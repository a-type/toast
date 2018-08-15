// @flow
import React from 'react';
import Ingredients from './Ingredients';
import Steps from './Steps';
import Details from './Details';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { pathOr } from 'ramda';
import { type Recipe, type RecipeIngredient, type Step } from 'types';
import { Redirect } from 'react-router-dom';
import { SingleColumn } from 'components/layouts';
import { Loader, H2 } from 'components/generic';
import JumpControls from './JumpControls';

const FullRecipeQuery = gql`
  query FullRecipeQuery($id: ID!) {
    recipe(id: $id) {
      id
      title
      description
      published
      author {
        id
        name
      }
      ingredients {
        id
        unit
        unitTextMatch
        value
        valueTextMatch
        text
        ingredientTextMatch
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

    me {
      id
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
        {(response: QueryResponse) => {
          if (
            !response.loading &&
            response.data &&
            response.data.recipe &&
            !response.data.recipe.published
          ) {
            if (response.data.recipe.author.id === response.data.me.id) {
              return <Redirect to={`/recipes/edit/${recipeId}`} />;
            }
            return <Redirect to="/" />;
          }

          if (response.error) {
            return <div>{response.error.message}</div>;
          }

          if (response.loading) {
            return <Loader size="72px" />;
          }

          return (
            <SingleColumn
              headerImageSrc={pathOr(
                null,
                ['data', 'recipe', 'coverImage', 'url'],
                response,
              )}
            >
              <SingleColumn.Content>
                <Details recipe={pathOr(null, ['data', 'recipe'], response)} />
                <H2>Ingredients</H2>
                <Ingredients
                  ingredients={pathOr(
                    [],
                    ['data', 'recipe', 'ingredients'],
                    response,
                  )}
                />
                <H2>Steps</H2>
                <Steps
                  steps={pathOr([], ['data', 'recipe', 'steps'], response)}
                />
              </SingleColumn.Content>
              <JumpControls />
            </SingleColumn>
          );
        }}
      </Query>
    );
  }
}
