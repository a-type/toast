import React from 'react';
import { Query } from 'react-apollo';
import { H1, P, Loader } from 'components/generic';
import gql from 'graphql-tag';
import RecipeCard from 'components/recipes/Card';

const Basic = gql`
  query UserInfo($id: ID!) {
    user(id: $id) {
      id
      name
      recipes {
        ...RecipeCard
      }
    }
  }

  ${RecipeCard.fragments.Recipe}
`;

export default ({ userId }) => (
  <Query query={Basic} variables={{ id: userId }}>
    {({ data, loading, error }) => {
      if (loading) return <Loader size="72px" />;
      if (error) {
        return <div>{error.message}</div>;
      }

      const { name, recipes } = data.user;

      return (
        <div>
          <H1>{name || 'Anonymous'}</H1>
          <RecipeCard.Grid>
            {recipes.map(recipe => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </RecipeCard.Grid>
        </div>
      );
    }}
  </Query>
);
