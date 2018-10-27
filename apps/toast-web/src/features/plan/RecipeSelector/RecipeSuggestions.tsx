import * as React from 'react';
import { Recipe } from 'generated/schema';
import RecipeSuggestionsQuery from './RecipeSuggestionsQuery';
import { RecipeCards } from 'features/recipes';
import { H3, HelpText, Link } from 'components/typeset';
import { Content } from 'components/layouts';

interface RecipeSuggestionsProps {
  onRecipeSelected(recipe: Recipe): void;
}

const RecipeSuggestions: React.SFC<RecipeSuggestionsProps> = ({
  onRecipeSelected,
}) => (
  <RecipeSuggestionsQuery>
    {({ data, loading }) => {
      if (loading) {
        return <RecipeCards.Skeleton />;
      }

      const {
        me: { discoveredRecipes, likedRecipes, recipes },
      } = data;

      return (
        <Content>
          {recipes.length && (
            <React.Fragment>
              <H3>Your Recipes</H3>
              <RecipeCards
                recipes={recipes}
                onRecipeSelected={onRecipeSelected}
              />
            </React.Fragment>
          )}
          <H3>Your Likes</H3>
          {likedRecipes.length ? (
            <RecipeCards
              recipes={likedRecipes}
              onRecipeSelected={onRecipeSelected}
            />
          ) : (
            <HelpText>Like some recipes to make planning easier!</HelpText>
          )}
          <H3>Your Discoveries</H3>
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
        </Content>
      );
    }}
  </RecipeSuggestionsQuery>
);

export default RecipeSuggestions;
