import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card } from 'features/ingredients';
import { CardShape } from 'components/generic/Card';

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
            return (
              <Card.Grid>
                {new Array(10).fill(null).map((_, idx) => (
                  <Card.Skeleton shape={CardShape.Normal} key={idx} />
                ))}
              </Card.Grid>
            );
          }

          if (error) {
            return error.message;
          }

          return (
            <Card.Grid>
              {data.ingredients.map(ingredient => (
                <Card ingredient={ingredient} />
              ))}
            </Card.Grid>
          );
        }}
      </Query>
    );
  }
}
