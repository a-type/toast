import React from 'react';
import { Query } from 'react-apollo';
import { Loader } from 'components/generic';
import { H1, H2, P } from 'components/typeset';
import gql from 'graphql-tag';
import RecipeCard from 'features/recipes/Card';

const Basic = gql`
  query UserInfo($id: ID!) {
    user(id: $id) {
      id
      name
      recipes {
        ...RecipeCard
      }
      discoveredRecipes {
        ...RecipeCard
      }
    }
  }

  ${RecipeCard.fragments.Recipe}
`;

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRecipes = (title, recipes) => {
    if (!recipes.length) {
      return null;
    }

    return (
      <React.Fragment>
        <H2>{title}</H2>
        <RecipeCard.Grid>
          {recipes.map(recipe => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </RecipeCard.Grid>
      </React.Fragment>
    );
  };

  render() {
    const { userId } = this.props;

    return (
      <Query query={Basic} variables={{ id: userId }}>
        {({ data, loading, error }) => {
          if (loading) return <Loader size="72px" />;
          if (error) {
            return <div>{error.message}</div>;
          }

          const { name, recipes, discoveredRecipes } = data.user;

          return (
            <div>
              <H1>{name || 'Anonymous'}</H1>
              {this.renderRecipes('Your Recipes', recipes)}
              {this.renderRecipes('Your Finds', discoveredRecipes)}
            </div>
          );
        }}
      </Query>
    );
  }
}
