import * as React from 'react';
import { HelpText } from 'components/typeset';
import { RecipeCards } from 'features/recipes';
import { pathOr } from 'ramda';
import RecipeSearchFiltersQuery from './RecipeSearchFiltersQuery';
import SearchRecipesQuery from './SearchRecipesQuery';
import { Heading } from 'grommet';

const SearchRecipeResults: React.SFC<{}> = props => (
  <RecipeSearchFiltersQuery>
    {({ data, error }) => {
      if (error) {
        return <div {...props}>{error.message}</div>;
      }

      const { searchFilters: filters = [] } = data;

      const include = filters.reduce((list, filter) => {
        if (filter.type === 'includeIngredient') {
          return list.concat([filter.subject]);
        }
        return list;
      }, []);
      const exclude = filters.reduce((list, filter) => {
        if (filter.type === 'excludeIngredient') {
          return list.concat([filter.subject]);
        }
        return list;
      }, []);
      const matchFilter = filters.find(f => f.type === 'match');
      const term = matchFilter ? matchFilter.subject : null;

      const searchInput = {
        term,
        ingredients: {
          include,
          exclude,
        },
      };

      return (
        <div {...props}>
          <Heading level="2" margin={{ bottom: filters.length ? 'xl' : 'sm' }}>
            Recipes
          </Heading>
          {filters.length === 0 && (
            <HelpText spaceBelow="lg">
              Use the search bar above to get started
            </HelpText>
          )}
          <SearchRecipesQuery
            variables={{ input: searchInput }}
            skip={filters.length === 0}
          >
            {({ data, loading, error }) => {
              if (error) {
                return <div>{error.message}</div>;
              }

              const items = pathOr([], ['searchRecipes', 'items'], data);

              if (loading || items.length === 0) {
                return <RecipeCards.Skeleton count={50} />;
              }

              return <RecipeCards recipes={items} />;
            }}
          </SearchRecipesQuery>
        </div>
      );
    }}
  </RecipeSearchFiltersQuery>
);

export default SearchRecipeResults;
