import React from 'react';
import { Query } from 'react-apollo';
import { Loader } from 'components/generic';
import { Content } from 'components/layouts';
import { H1, H2, P } from 'components/typeset';
import gql from 'fraql';
import RecipeCard from 'features/recipes/Card';

const Basic = gql`
  query UserInfo($id: ID!) {
    user(id: $id) {
      id
      name
      nickname
      recipes {
        ${RecipeCard.fragments.recipe}
      }
      discoveredRecipes {
        ${RecipeCard.fragments.recipe}
      }
      draftRecipes {
        ${RecipeCard.fragments.recipe}
      }
      likedRecipes {
        ${RecipeCard.fragments.recipe}
      }
    }
  }

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
      <Content>
        <H2>{title}</H2>
        <RecipeCard.Grid>
          {recipes.map(recipe => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </RecipeCard.Grid>
      </Content>
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

          const {
            name,
            nickname,
            recipes,
            discoveredRecipes,
            draftRecipes,
            likedRecipes,
          } = data.user;

          return (
            <React.Fragment>
              <Content>
                <H1>{nickname || 'Anonymous'}</H1>
              </Content>
              {this.renderRecipes('Your Likes', likedRecipes)}
              {this.renderRecipes('Your Drafts', draftRecipes)}
              {this.renderRecipes('Your Recipes', recipes)}
              {this.renderRecipes('Your Finds', discoveredRecipes)}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
