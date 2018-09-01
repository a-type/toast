import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Layout } from './components';
import { H1 } from 'components/typeset';
import Card from 'features/recipes/Card';

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

    if (loading) {
      return (
        <Card.Grid loading>
          {new Array(50)
            .fill(null)
            .map((_, idx) => <Card.Skeleton key={idx} />)}
        </Card.Grid>
      );
    }

    const { items } = data.searchRecipes;

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

          const { searchFilters: filters } = data;

          if (loading || !filters.length) {
            return null;
          }

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
              <H1>{filters.length ? 'Search Results' : 'Explore'}</H1>
              <Query query={SearchRecipes} variables={{ input: searchInput }}>
                {this.renderSearchResults}
              </Query>
            </div>
          );
        }}
      </Query>
    );
  }
}
