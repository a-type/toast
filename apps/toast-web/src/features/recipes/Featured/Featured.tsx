import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Content } from 'components/layouts';
import { Disconnected } from 'components/generic';
import { RecipeCards } from 'features/recipes';
import Spotlight from './SpotlightRecipe';
import { pathOr } from 'ramda';
import { H2 } from 'components/typeset';
import { PrioritizedPromotion } from '../../promotions';

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

  ${RecipeCards.fragments.recipe}
  ${Spotlight.fragments.recipe}
`;

export default () => (
  <Query query={FeaturedRecipes} variables={{ count: 10 }}>
    {({ data, loading, error }) => {
      if (loading) {
        return (
          <Content>
            <Spotlight.Skeleton />
            <H2>Popular Recipes</H2>
            <RecipeCards.Skeleton />
          </Content>
        );
      }

      if (error) {
        return (
          <Content>
            <Spotlight.Skeleton />
            <Disconnected />
          </Content>
        );
      }

      const { recipes } = data;

      return (
        <React.Fragment>
          <PrioritizedPromotion />
          <Content>
            <Spotlight recipe={recipes[0]} />
            <H2>Popular Recipes</H2>
            <RecipeCards recipes={recipes.slice(1)} />
          </Content>
        </React.Fragment>
      );
    }}
  </Query>
);
