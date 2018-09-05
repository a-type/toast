import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { SingleColumn } from 'components/layouts';
import Card from '../Card';
import Spotlight from './Spotlight';
import { path, pathOr } from 'ramda';
import { H2 } from 'components/typeset';

const FeaturedRecipes = gql`
  query FeaturedRecipes($count: Int!) {
    recipes(pagination: { offset: 0, count: $count }) {
      coverImage {
        id
        url
        attribution
      }
      ...RecipeCard
      ...RecipeSpotlight
    }
  }

  ${Card.fragments.Recipe}
  ${Spotlight.fragments.Recipe}
`;

export default () => (
  <Query query={FeaturedRecipes} variables={{ count: 10 }}>
    {({ data, loading, error }) => {
      if (loading) {
        return (
          <SingleColumn loading>
            <SingleColumn.Content>
              <Spotlight.Skeleton />
            </SingleColumn.Content>
            <SingleColumn.Content>
              <H2>Popular Recipes</H2>
              <Card.Grid loading>
                {new Array(9).fill(null).map((_, idx) => (
                  <Card.Skeleton key={idx} />
                ))}
              </Card.Grid>
            </SingleColumn.Content>
          </SingleColumn>
        );
      }

      if (error) {
        return <div>{error.message}</div>;
      }

      const { recipes } = data;

      return (
        <SingleColumn headerImage={pathOr(null, ['coverImage'], recipes[0])}>
          <SingleColumn.Content>
            <Spotlight recipe={recipes[0]} />
          </SingleColumn.Content>
          <SingleColumn.Content>
            <H2>Popular Recipes</H2>
            <Card.Grid>
              {recipes.slice(1).map(recipe => (
                <Card recipe={recipe} key={recipe.id} />
              ))}
            </Card.Grid>
          </SingleColumn.Content>
        </SingleColumn>
      );
    }}
  </Query>
);
