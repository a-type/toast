import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Layout } from './components';
import Filter from './Filter';
import { Heading } from 'grommet';

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
            return <div {...this.props}>{error.message}</div>;
          }

          const { searchFilters = [] } = data;

          return (
            <div {...this.props}>
              <Heading level="3">Filters</Heading>
              <Layout>
                {searchFilters.map(filter => (
                  <Filter key={filter.id} {...filter} />
                ))}
              </Layout>
            </div>
          );
        }}
      </Query>
    );
  }
}
