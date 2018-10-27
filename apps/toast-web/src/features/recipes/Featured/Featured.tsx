import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Content, Hero } from 'components/layouts';
import { Disconnected } from 'components/generic';
import { RecipeCards } from 'features/recipes';
import Spotlight from './Spotlight';
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
          <React.Fragment>
            <Hero loading>
              <Spotlight.Skeleton />
            </Hero>
            <Content>
              <H2>Popular Recipes</H2>
              <RecipeCards.Skeleton />
            </Content>
          </React.Fragment>
        );
      }

      if (error) {
        return (
          <React.Fragment>
            <Hero loading>
              <Spotlight.Skeleton />
            </Hero>
            <Content>
              <Disconnected />
            </Content>
          </React.Fragment>
        );
      }

      const { recipes } = data;

      return (
        <React.Fragment>
          <Hero image={pathOr(null, ['coverImage'], recipes[0])}>
            <Spotlight recipe={recipes[0]} />
          </Hero>
          <PrioritizedPromotion />
          <Content>
            <H2>Popular Recipes</H2>
            <RecipeCards recipes={recipes.slice(1)} />
          </Content>
        </React.Fragment>
      );
    }}
  </Query>
);
