import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Loader } from 'components/generic';
import { Content } from 'components/layouts';

const GetRecentIngredients = gql`
  query RecentIngredients {
    ingredients {
      id
      name
      alternateNames
    }
  }
`;

export default class RecentIngredients extends React.Component {
  render() {
    return (
      <Query query={GetRecentIngredients}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loader />;
          }

          if (error) {
            return <Content>{error.message}</Content>;
          }

          return (
            <Content>
              {data.ingredients.map(({ id, name }) => <div>{name}</div>)}
            </Content>
          );
        }}
      </Query>
    );
  }
}
