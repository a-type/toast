import React from 'react';
import { Query } from 'react-apollo';
import { Loader } from 'components/generic';
import { Content } from 'components/layouts';
import { H1, H2 } from 'components/typeset';
import gql from 'graphql-tag';
import { RecipeCards } from 'features/recipes';

interface UserSummaryProps {
  userId: string;
}

const Basic = gql`
  query UserInfo($id: ID!) {
    user(id: $id) {
      id
      name
      nickname
      recipes {
        ...RecipeCard
      }
      discoveredRecipes {
        ...RecipeCard
      }
      draftRecipes {
        ...RecipeCard
      }
      likedRecipes {
        ...RecipeCard
      }
    }
  }

  ${RecipeCards.fragments.recipe}
`;

export default class extends React.Component<UserSummaryProps> {
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
        <RecipeCards recipes={recipes} />
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
