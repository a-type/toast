import * as React from 'react';
import { Recipe } from 'generated/schema';
import RecipeSuggestionsQuery from './RecipeSuggestionsQuery';
import { RecipeCards } from 'features/recipes';
import { HelpText, Link } from 'components/text';
import { Heading } from 'grommet';
import { HeadingSkeleton } from 'components/skeletons';

interface RecipeSuggestionsProps {
  onRecipeSelected(recipe: Recipe): void;
}

const RecipeSuggestions: React.SFC<RecipeSuggestionsProps> = ({
  onRecipeSelected,
}) => (
  <RecipeSuggestionsQuery>
    {({ data, loading }) => {
      if (loading) {
        return (
          <React.Fragment>
            <HeadingSkeleton level="3" />
            <RecipeCards.Skeleton />
          </React.Fragment>
        );
      }

      const {
        me: { discoveredRecipes, likedRecipes, recipes },
      } = data;

      return (
        <React.Fragment>
          {recipes.length && (
            <React.Fragment>
              <Heading level="4">Your Recipes</Heading>
              <RecipeCards
                recipes={recipes}
                onRecipeSelected={onRecipeSelected}
              />
            </React.Fragment>
          )}
          <Heading level="4">Your Likes</Heading>
          {likedRecipes.length ? (
            <RecipeCards
              recipes={likedRecipes}
              onRecipeSelected={onRecipeSelected}
            />
          ) : (
            <HelpText>Like some recipes to make planning easier!</HelpText>
          )}
          <Heading level="4">Your Discoveries</Heading>
          {discoveredRecipes.length ? (
            <RecipeCards
              recipes={discoveredRecipes}
              onRecipeSelected={onRecipeSelected}
            />
          ) : (
            <HelpText>
              Use the <Link to="/scanner">Toast Scanner</Link> to gather recipes
              from around the web!
            </HelpText>
          )}
        </React.Fragment>
      );
    }}
  </RecipeSuggestionsQuery>
);

export default RecipeSuggestions;
