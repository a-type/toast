import React, { SFC, useContext, Fragment } from 'react';
import { PlanMealRecipeData } from '../types';
import { RecipeCards } from 'features/recipes';
import { HelpText, Link } from 'components/text';
import { Heading, Box, Text, Paragraph, Button } from 'grommet';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import LinkerContext from 'contexts/LinkerContext';

export const Document = gql`
  query RecipeSuggestions {
    me {
      id
      recipes {
        ...RecipeCard
      }
      discoveredRecipes {
        ...RecipeCard
      }
      # likedRecipes {
      #   ...RecipeCard
      # }
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
  const { data, error, refetch } = useQuery(Document);
  const { setOpen } = useContext(LinkerContext);

  if (error) {
    return (
      <Box>
        <Text color="status-error">Dangit.</Text>
        <Paragraph>
          We couldn't load your recipes. That's almost definitely our bad. Maybe
          retrying will help?
        </Paragraph>
        <Button onClick={() => refetch()} label="Retry" />
      </Box>
    );
  }

  if (!data || !data.me) {
    return null;
  }

  const {
    me: { discoveredRecipes, likedRecipes, recipes },
  } = data;

  return (
    <Box
      margin={{ bottom: 'large' }}
      style={{ minWidth: '500px', maxWidth: '90vw' }}
    >
      {recipes.length > 0 && (
        <Fragment>
          <Heading level="4">Your Recipes</Heading>
          <RecipeCards recipes={recipes} onRecipeSelected={onRecipeSelected} />
        </Fragment>
      )}
      {/* <Heading level="4">Your Likes</Heading>
      {likedRecipes.length ? (
        <RecipeCards
          recipes={likedRecipes}
          onRecipeSelected={onRecipeSelected}
        />
      ) : (
        <HelpText margin={{ bottom: 'large' }}>
          Like some recipes to make planning easier!
        </HelpText>
      )} */}
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
          <Button
            onClick={() => {
              setOpen(true);
              onCancel();
            }}
            label="Add a recipe"
          />
        </Box>
      )}
    </Box>
  );
};

export default RecipeSuggestions;
