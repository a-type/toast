import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link, Loader } from 'components/generic';

const Me = gql`
  query Me {
    me {
      id
      name
    }
  }
`;

export default () => (
  <Query query={Me}>
    {({ data, loading, error }) => {
      if (error) {
        return <Link to="/login">Log in / Sign up</Link>;
      }

      if (loading) {
        return <Loader size="1em" />;
      }

      return <Link to={`/users/${data.me.id}`}>Profile</Link>;
    }}
  </Query>
);
