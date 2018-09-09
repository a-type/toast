import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Content, Hero } from 'components/layouts';
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
          <React.Fragment>
            <Hero loading />
            <Content>
              <Spotlight.Skeleton />
            </Content>
            <Content>
              <H2>Popular Recipes</H2>
              <Card.Grid loading>
                {new Array(9)
                  .fill(null)
                  .map((_, idx) => <Card.Skeleton key={idx} />)}
              </Card.Grid>
            </Content>
          </React.Fragment>
        );
      }

      if (error) {
        return <div>{error.message}</div>;
      }

      const { recipes } = data;

      return (
        <React.Fragment>
          <Hero image={pathOr(null, ['coverImage'], recipes[0])} />
          <Content>
            <Spotlight recipe={recipes[0]} />
          </Content>
          <Content>
            <H2>Popular Recipes</H2>
            <Card.Grid>
              {recipes
                .slice(1)
                .map(recipe => <Card recipe={recipe} key={recipe.id} />)}
            </Card.Grid>
          </Content>
        </React.Fragment>
      );
    }}
  </Query>
);
