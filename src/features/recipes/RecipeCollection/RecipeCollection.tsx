import React, { FC } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Text, Box, Heading } from 'grommet';
import RecipeCards from '../RecipeCards';

const RecipeCollectionQuery = gql`
  query RecipeCollection {
    me {
      authoredRecipes {
        ...RecipeFragment
      }
      discoveredRecipes {
        ...RecipeFragment
      }
      draftRecipes {
        ...RecipeFragment
      }
      likedRecipes {
        ...RecipeFragment
      }
    }
  }

  fragment RecipeFragment on Recipe {
    id
    title
    coverImage {
      id
      url
    }
  }
`;

type RecipeFragmentResult = {
  id: string;
  title: string;
  coverImage?: {
    id: string;
    url: string;
  };
};

type RecipeCollectionQueryResult = {
  me: {
    authoredRecipes: RecipeFragmentResult[];
    discoveredRecipes: RecipeFragmentResult[];
    draftRecipes: RecipeFragmentResult[];
    likedRecipes: RecipeFragmentResult[];
  };
};

export const RecipeCollection: FC<{}> = ({}) => {
  const { data, error } = useQuery<RecipeCollectionQueryResult>(
    RecipeCollectionQuery,
  );

  if (error) {
    return <Text>Sorry, we couldn't load your recipes</Text>;
  }

  if (!data.me) {
    return null;
  }

  return (
    <Box>
      <Heading level="2">Liked</Heading>
      <RecipeCards recipes={data.me.likedRecipes} />
      <Heading level="2">Discovered</Heading>
      <RecipeCards recipes={data.me.discoveredRecipes} />
      <Heading level="2">Authored</Heading>
      <RecipeCards recipes={data.me.authoredRecipes} />
      <Heading level="2">Drafts</Heading>
      <RecipeCards recipes={data.me.draftRecipes} />
    </Box>
  );
};
