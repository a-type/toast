import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'fraql';
import { H1 } from 'components/typeset';
import { Card, Layout, Skeleton } from './components';

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
      return <div>{error.message}</div>;
    }

    if (loading) {
      return (
        <div>
          <H1>Ingredients</H1>
          <Layout>
            {new Array(10).fill(null).map((_, idx) => <Skeleton key={idx} />)}
          </Layout>
        </div>
      );
    }

    const { items } = data.searchIngredients;

    return (
      <div>
        <H1>Ingredients</H1>
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
