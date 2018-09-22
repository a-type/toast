import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Loader } from 'components/generic';
import { Content } from 'components/layouts';
import { Card } from 'features/ingredients';

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
              <Content>
                <Card.Grid>
                  {new Array(10)
                    .fill(null)
                    .map((_, idx) => (
                      <Card.Skeleton shape="normal" key={idx} />
                    ))}
                </Card.Grid>
              </Content>
            );
          }

          if (error) {
            return <Content>{error.message}</Content>;
          }

          return (
            <Content>
              <Card.Grid>
                {data.ingredients.map(ingredient => (
                  <Card ingredient={ingredient} />
                ))}
              </Card.Grid>
            </Content>
          );
        }}
      </Query>
    );
  }
}