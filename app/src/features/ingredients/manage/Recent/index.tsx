import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card } from 'features/ingredients';
import { CardShape, CardGrid } from 'components/generic/Card';
import { CardSkeleton } from 'components/skeletons';
import ErrorMessage from 'components/generic/ErrorMessage';

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
              <CardGrid>
                {new Array(10).fill(null).map((_, idx) => (
                  <CardSkeleton key={idx} />
                ))}
              </CardGrid>
            );
          }

          if (error) {
            return <ErrorMessage error={error} />;
          }

          return (
            <CardGrid>
              {data.ingredients.map(ingredient => (
                <Card ingredient={ingredient} />
              ))}
            </CardGrid>
          );
        }}
      </Query>
    );
  }
}
