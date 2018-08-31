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
      total
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
        <div>
          <H1>... recipes</H1>
          <Card.Grid>
            {new Array(50).fill(null).map((_, idx) => (
              <Card.Skeleton key={idx} />
            ))}
          </Card.Grid>
        </div>
      );
    }

    const { total, items } = data.searchRecipes;

    return (
      <div>
        <H1>{total} recipes</H1>
        <Card.Grid>
          {items.map(recipe => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </Card.Grid>
      </div>
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
            <Query query={SearchRecipes} variables={{ input: searchInput }}>
              {this.renderSearchResults}
            </Query>
          );
        }}
      </Query>
    );
  }
}
