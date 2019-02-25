import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Disconnected } from 'components/generic';
import { RecipeCards } from 'features/recipes';
import { Spotlight } from 'features/recipes/components';
import { Heading } from 'grommet';

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

const FeaturedRecipe: React.SFC<{}> = () => (
  <Query query={FeaturedRecipes} variables={{ count: 10 }}>
    {({ data, loading, error }) => {
      if (loading) {
        return (
          <React.Fragment>
            <Spotlight.Skeleton />
            <Heading level="2">Popular Recipes</Heading>
            <RecipeCards.Skeleton />
          </React.Fragment>
        );
      }

      if (error) {
        return (
          <React.Fragment>
            <Spotlight.Skeleton />
            <Disconnected />
          </React.Fragment>
        );
      }

      const { recipes } = data;

      return (
        <React.Fragment>
          <Spotlight recipe={recipes[0]} />
          <Heading level="2">Popular Recipes</Heading>
          <RecipeCards recipes={recipes.slice(1)} />
        </React.Fragment>
      );
    }}
  </Query>
);

export default FeaturedRecipe;