import React from 'react';
import { Query } from 'react-apollo';
import { Loader } from 'components/generic';
import gql from 'graphql-tag';
import { RecipeCards } from 'features/recipes';
import { Heading } from 'components/text';
import ErrorMessage from 'components/generic/ErrorMessage';

interface UserSummaryProps {
  userId: string;
}

const Basic = gql`
  query UserInfo($id: ID!) {
    user(id: $id) {
      id
      displayName
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

  fragment RecipeCard on Recipe {
    id
    title
    coverImage {
      id
      url
      attribution
    }
  }
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
      <React.Fragment>
        <Heading level="2">{title}</Heading>
        <RecipeCards recipes={recipes} />
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
            return <ErrorMessage error={error} />;
          }

          const {
            displayName,
            recipes,
            discoveredRecipes,
            draftRecipes,
            likedRecipes,
          } = data.user;

          return (
            <React.Fragment>
              <Heading>{displayName || 'Anonymous'}</Heading>

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
