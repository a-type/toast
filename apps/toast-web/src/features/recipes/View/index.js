// @flow
import React from 'react';
import Ingredients from './Ingredients';
import Steps from './Steps';
import Details from './Details';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { pathOr, path } from 'ramda';
import { type Recipe, type RecipeIngredient, type Step } from 'types';
import { Redirect } from 'react-router-dom';
import { SingleColumn } from 'components/layouts';
import { Loader } from 'components/generic';
import { H2, H1 } from 'components/typeset';
import JumpControls from './JumpControls';
import LinkFrame from './LinkFrame';
import ViewSpy from './ViewSpy';

const FullRecipeQuery = gql`
  query FullRecipeQuery($id: ID!) {
    recipe(id: $id) {
      id
      title
      description
      published
      displayType
      attribution
      sourceUrl
      servings
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

export default class RecipeView extends React.Component<Props> {
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
            if (
              pathOr('none', ['data', 'recipe', 'author', 'id'], response) ===
              path(['data', 'me', 'id'], response)
            ) {
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
                <H1 name="Title">
                  {pathOr('', ['data', 'recipe', 'title'], response)}
                </H1>
                <Details recipe={pathOr(null, ['data', 'recipe'], response)} />
                <H2 name="IngredientsSection">Ingredients</H2>
                <Ingredients
                  ingredients={pathOr(
                    [],
                    ['data', 'recipe', 'ingredients'],
                    response,
                  )}
                />
                <H2 name="StepsSection">Steps</H2>
                {path(['data', 'recipe', 'displayType'], response) ===
                'FULL' ? (
                  <Steps
                    steps={pathOr([], ['data', 'recipe', 'steps'], response)}
                  />
                ) : (
                  <LinkFrame
                    src={path(['data', 'recipe', 'sourceUrl'], response)}
                  />
                )}
              </SingleColumn.Content>
              <SingleColumn.Content>
                <JumpControls />
              </SingleColumn.Content>
              <ViewSpy recipeId={recipeId} />
            </SingleColumn>
          );
        }}
      </Query>
    );
  }
}
