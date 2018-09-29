import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'fraql';
import { Layout, BorderContainer } from './components';
import Filter from './Filter';
import { H2 } from 'components/typeset';

const GetFilters = gql`
  query GetFilters {
    searchFilters @client {
      id
      type
      subject
      display
    }
  }
`;

const AddFilter = gql`
  mutation AddFilter($type: String!, $subject: String!) {
    addSearchFilter(type: $type, subject: $subject) @client {
      id
      type
      subject
    }
  }
`;

export default class Filters extends React.Component {
  render() {
    return (
      <Query query={GetFilters}>
        {({ data, loading, error }) => {
          if (error) {
            return <div>{error.message}</div>;
          }

          const { searchFilters = [] } = data;

          return (
            <BorderContainer>
              <H2>Filters</H2>
              <Layout>
                {searchFilters.map(filter => (
                  <Filter key={filter.id} {...filter} />
                ))}
              </Layout>
            </BorderContainer>
          );
        }}
      </Query>
    );
  }
}
