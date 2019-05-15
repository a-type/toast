import React from 'react';
import { Link } from 'components/generic';
import { Button, Paragraph } from 'grommet';
import { Heading } from 'components/text';
import { RecipeCards } from 'features/recipes';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { pathOr } from 'ramda';
import { Logo } from 'components/brand';
import Column from 'components/layout/Column';

const PopularRecipes = gql`
  query PopularRecipes {
    recipes(orderBy: views_desc, first: 5) {
      id
      title
      coverImage {
        id
        url
        attribution
      }
    }
  }
`;

type PopularRecipesResult = {
  recipes: {
    id: string;
    title: string;
    coverImage?: {
      id: string;
      url: string;
      attribution: string;
    };
  }[];
};

export const FeaturedRecipes = (
  queryResult: QueryHookResult<PopularRecipesResult, any>,
) => {
  if (queryResult.error || queryResult.loading) {
    return null;
  }

  const recipes = pathOr([], ['recipes'], queryResult.data);

  return <RecipeCards recipes={recipes} />;
};

export default () => {
  const result = useQuery<PopularRecipesResult>(PopularRecipes);

  return (
    <Column>
      <Logo
        pattern
        style={{ margin: 'auto auto var(--spacing-lg) 0' }}
        size="10vw"
      />
      <Heading>Bring order to your week</Heading>
      <Paragraph size="large">
        Join Toast and start planning your daily meals in advance the easy way.
      </Paragraph>
      <Paragraph size="large" margin={{ bottom: 'large' }}>
        <Link to="/login?r=/">
          <Button
            style={{ fontSize: 'var(--font-size-lg)' }}
            primary
            label="Join or log in"
          />
        </Link>
      </Paragraph>
      <Heading level="2">All of the Internet's Recipes</Heading>
      <FeaturedRecipes {...result} />
      <Paragraph size="large">
        Bring all your favorites. We make it easy to scan recipes from across
        the web and add them to your plan.
      </Paragraph>
      {/* <Heading level="2">Instantly Fit Your Schedule with Toast Gold</Heading>
      <Paragraph>
        Upgrade your account to make planning even easier with an AI-driven
        schedule.
      </Paragraph> */}
    </Column>
  );
};
