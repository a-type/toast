import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Content, Hero } from 'components/layouts';
import { Centered, Icon } from 'components/generic';
import Card from '../Card';
import Spotlight from './Spotlight';
import { path, pathOr } from 'ramda';
import { H2, P } from 'components/typeset';
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

  ${Card.fragments.Recipe}
  ${Spotlight.fragments.Recipe}
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
        return (
          <React.Fragment>
            <Hero loading>
              <Spotlight.Skeleton />
            </Hero>
            <Content>
              <Centered style={{ opacity: 0.75, color: 'var(--color-gray)' }}>
                <Icon name="unavailable-cloud" size="90px" />
                <P>Couldn't reach the server. Refreshing might work.</P>
              </Centered>
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
