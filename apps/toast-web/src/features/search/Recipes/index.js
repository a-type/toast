import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Layout } from './components';
import { H1, HelpText } from 'components/typeset';
import Card from 'features/recipes/Card';
import { pathOr } from 'ramda';

const GetFilters = gql`
  query GetFilters {
    searchFilters @client {
      id
      type
      subject
    }
  }
`;

const SearchRecipes = gql`
  query SearchRecipes($input: RecipeSearchInput!) {
    searchRecipes(input: $input) {
      items {
        id
        title
        coverImage {
          id
          url
        }
      }
    }
  }
`;

export default class SearchRecipeResults extends React.Component {
  renderSearchResults = ({ data, loading, error }) => {
    if (error) {
      return <div>{error.message}</div>;
    }

    const items = pathOr([], ['searchRecipes', 'items'], data);

    if (loading || items.length === 0) {
      return (
        <Card.Grid loading>
          {new Array(50)
            .fill(null)
            .map((_, idx) => <Card.Skeleton key={idx} />)}
        </Card.Grid>
      );
    }

    return (
      <Card.Grid>
        {items.map(recipe => <Card key={recipe.id} recipe={recipe} />)}
      </Card.Grid>
    );
  };

  render() {
    return (
      <Query query={GetFilters}>
        {({ data, loading, error }) => {
          if (error) {
            return <div>{error.message}</div>;
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
            <div>
              <H1 spaceBelow={filters.length ? 'xl' : 'sm'}>Recipes</H1>
              {filters.length === 0 && (
                <HelpText spaceBelow="lg">
                  Use the search bar above to get started
                </HelpText>
              )}
              <Query
                query={SearchRecipes}
                variables={{ input: searchInput }}
                skip={filters.length === 0}
              >
                {this.renderSearchResults}
              </Query>
            </div>
          );
        }}
      </Query>
    );
  }
}
