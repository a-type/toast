import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { H1 } from 'components/typeset';
import { Card, Layout, Skeleton } from './components';

const GetSearchInputValue = gql`
  query GetSearchInputValue {
    searchInputValue
  }
`;

const AddFilter = gql`
  mutation AddFilter($type: String!, $subject: String!, $display: String!) {
    addSearchFilter(type: $type, subject: $subject, display: $display) @client {
      id
      type
      subject
      display
    }
  }
`;

const SearchIngredients = gql`
  query SearchIngredients($input: IngredientSearchInput!) {
    searchIngredients(input: $input) {
      total
      items {
        id
        name
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
          <H1>... ingredients</H1>
          <Layout>
            {new Array(10).fill(null).map((_, idx) => (
              <Skeleton key={idx} />
            ))}
          </Layout>
        </div>
      );
    }

    const { total, items } = data.searchIngredients;

    return (
      <div>
        <H1>{total} ingredients</H1>
        <Layout>
          <Mutation mutation={AddFilter}>
            {mutate =>
              items.map(ingredient => (
                <Card
                  key={ingredient.id}
                  ingredient={ingredient}
                  include={() =>
                    mutate({
                      variables: {
                        type: 'includeIngredient',
                        subject: ingredient.id,
                        display: ingredient.name,
                      },
                    })
                  }
                  exclude={() =>
                    mutate({
                      variables: {
                        type: 'excludeIngredient',
                        subject: ingredient.id,
                        display: ingredient.name,
                      },
                    })
                  }
                />
              ))
            }
          </Mutation>
        </Layout>
      </div>
    );
  };

  render() {
    return (
      <Query query={GetSearchInputValue}>
        {({ data, loading, error }) => {
          if (error) {
            return <div>{error.message}</div>;
          }

          const { searchInputValue } = data;

          const searchInput = {
            term: searchInputValue,
          };

          return (
            <Query query={SearchIngredients} variables={{ input: searchInput }}>
              {this.renderSearchResults}
            </Query>
          );
        }}
      </Query>
    );
  }
}
