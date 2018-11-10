import React from 'react';
import Ingredients from './Ingredients';
import Steps from './Steps';
import Details from './Details';
import { Query } from 'react-apollo';
import gql from 'fraql';
import { pathOr, path } from 'ramda';
import { Redirect } from 'react-router-dom';
import { Content, Hero } from 'components/layouts';
import { Loader } from 'components/generic';
import { H2, H1, Span } from 'components/typeset';
import JumpControls from './JumpControls';
import LinkFrame from './LinkFrame';
import ViewSpy from './ViewSpy';
import EditButton from './EditButton';

const FullRecipeQuery = gql`
  query FullRecipeQuery($id: ID!) {
    recipe(id: $id) {
      id
      published
      displayType
      ${Details.fragments.Recipe}
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
        attribution
      }
    }

    me {
      id
    }
  }
`;

export default class RecipeView extends React.Component {
  render() {
    const { recipeId } = this.props;

    return (
      <Query query={FullRecipeQuery} variables={{ id: recipeId }}>
        {response => {
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

          return (
            <React.Fragment>
              <Hero
                image={pathOr(null, ['data', 'recipe', 'coverImage'], response)}
                loading={response.loading}
              >
                {response.loading ? (
                  <H1>
                    <Span.Skeleton />
                  </H1>
                ) : (
                  <H1 name="Title">
                    {pathOr('', ['data', 'recipe', 'title'], response)}
                    <EditButton
                      displayType={path(
                        ['data', 'recipe', 'displayType'],
                        response,
                      )}
                      recipeId={recipeId}
                      authorId={path(
                        ['data', 'recipe', 'author', 'id'],
                        response,
                      )}
                    />
                  </H1>
                )}
              </Hero>
              <Content>
                <Details recipe={pathOr(null, ['data', 'recipe'], response)} />
                <H2 name="IngredientsSection">Ingredients</H2>
                <Ingredients
                  servings={path(['data', 'recipe', 'servings'], response)}
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
              </Content>
              <Content>
                <JumpControls />
              </Content>
              <ViewSpy recipeId={recipeId} />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
