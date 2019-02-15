import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Layout, Skeleton } from './components';
import { Heading } from 'grommet';

const GetSearchInputValue = gql`
  query IngredientsGetSearchInputValue {
    searchInputValue
  }
`;

const AddFilter = gql`
  mutation IngredientsAddFilter(
    $type: String!
    $subject: String!
    $display: String!
  ) {
    addSearchFilter(type: $type, subject: $subject, display: $display) @client {
      id
      type
      subject
      display
    }
  }
`;

const SearchIngredients = gql`
  query IngredientsSearchIngredients($input: IngredientSearchInput!) {
    searchIngredients(input: $input) {
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
      return <div {...this.props}>{error.message}</div>;
    }

    if (loading) {
      return (
        <div {...this.props}>
          <Heading level="2">Ingredients</Heading>
          <Layout>
            {new Array(10).fill(null).map((_, idx) => (
              <Skeleton key={idx} />
            ))}
          </Layout>
        </div>
      );
    }

    const { items } = data.searchIngredients;

    return (
      <div
        style={{ overflow: 'hidden', marginBottom: 'var(--spacing-lg)' }}
        {...this.props}
      >
        <Heading level="2">Ingredients</Heading>
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
            return <div {...this.props}>{error.message}</div>;
          }

          const { searchInputValue } = data;

          if (!searchInputValue) {
            return null;
          }

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
