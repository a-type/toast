import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Content, LayoutTypes } from 'components/layouts';
import { Disconnected } from 'components/generic';
import { RecipeCards } from 'features/recipes';
import { Spotlight } from 'features/recipes/components';
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

  ${RecipeCards.fragments.recipe}
  ${Spotlight.fragments.recipe}
`;

export interface FeaturedRecipeProps {
  contentArea: LayoutTypes.ContentArea;
}

const FeaturedRecipe: React.SFC<FeaturedRecipeProps> = props => (
  <Content {...props}>
    <Query query={FeaturedRecipes} variables={{ count: 10 }}>
      {({ data, loading, error }) => {
        if (loading) {
          return (
            <React.Fragment>
              <Spotlight.Skeleton />
              <H2>Popular Recipes</H2>
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
            <H2>Popular Recipes</H2>
            <RecipeCards recipes={recipes.slice(1)} />
          </React.Fragment>
        );
      }}
    </Query>
  </Content>
);

export default FeaturedRecipe;
