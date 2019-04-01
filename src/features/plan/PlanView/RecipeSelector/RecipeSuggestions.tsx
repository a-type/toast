import React, { SFC, useContext, Fragment } from 'react';
import { PlanMealRecipeData } from '../../types';
import { RecipeCards } from 'features/recipes';
import { HelpText, Link } from 'components/text';
import { Heading, Box, Text, Paragraph, Button } from 'grommet';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import LinkerContext from 'contexts/LinkerContext';
import useRecipeCollection from 'features/recipes/useRecipeCollection';
import { Loader, Link as WrapLink } from 'components/generic';

export const Document = gql`
  query RecipeSuggestions {
    me {
      id
      authoredRecipes {
        ...RecipeCard
      }
      discoveredRecipes {
        ...RecipeCard
      }
      likedRecipes {
        ...RecipeCard
      }
    }
  }

  fragment RecipeCard on Recipe {
    id
    title
    coverImage {
      id
      url
      attribution
    }
  }
`;

interface RecipeSuggestionsProps {
  onRecipeSelected(recipe: PlanMealRecipeData): void;
  onCancel(): void;
}

const RecipeSuggestions: SFC<RecipeSuggestionsProps> = ({
  onRecipeSelected,
  onCancel,
}) => {
  const [collections, loading, error, result] = useRecipeCollection();
  const { setOpen } = useContext(LinkerContext);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Box>
        <Text color="status-error">Dangit.</Text>
        <Paragraph>
          We couldn't load your recipes. That's almost definitely our bad. Maybe
          retrying will help?
        </Paragraph>
        <Button onClick={() => result.refetch()} label="Retry" />
      </Box>
    );
  }

  const { authoredRecipes, likedRecipes, discoveredRecipes } = collections;

  return (
    <Box
      margin={{ bottom: 'large' }}
      style={{ minWidth: '500px', maxWidth: '90vw' }}
    >
      {authoredRecipes.length > 0 && (
        <Fragment>
          <Heading level="4">Your Recipes</Heading>
          <RecipeCards
            recipes={authoredRecipes}
            onRecipeSelected={onRecipeSelected}
          />
        </Fragment>
      )}
      <Heading level="4">Your Likes</Heading>
      {likedRecipes.length ? (
        <RecipeCards
          recipes={likedRecipes}
          onRecipeSelected={onRecipeSelected}
        />
      ) : (
        <HelpText margin={{ bottom: 'large' }}>
          Like some recipes to make planning easier!
        </HelpText>
      )}
      <Heading level="4">Your Discoveries</Heading>
      {discoveredRecipes.length ? (
        <RecipeCards
          recipes={discoveredRecipes}
          onRecipeSelected={onRecipeSelected}
        />
      ) : (
        <Box>
          <HelpText margin={{ bottom: 'medium' }}>
            Use the Toast Scanner to gather recipes from around the web!
          </HelpText>
          <WrapLink to="/recipes/find">
            <Button label="Add a recipe" />
          </WrapLink>
        </Box>
      )}
    </Box>
  );
};

export default RecipeSuggestions;
