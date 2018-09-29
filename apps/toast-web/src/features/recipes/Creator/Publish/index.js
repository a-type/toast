import React from 'react';
import { Formik } from 'formik';
import gql from 'fraql';
import { Mutation } from 'react-apollo';
import { Form, Button, Field } from 'components/generic';

const HELP_TEXT =
  'Once your recipe is published, you can still edit it, ' +
  "but you can't unpublish it.";
const PUBLISHED_CONTENT = 'Published';
const NOT_PUBLISHED_CONTENT = 'Publish';

export const RecipeCreatePublishFragment = gql`
  fragment RecipeCreatePublish on Recipe {
    id
    published
  }
`;

const PublishRecipe = gql`
  mutation PublishRecipe($id: ID!) {
    publishRecipe(id: $id) {
      ${RecipeCreatePublishFragment}
    }
  }
`;

export default class RecipeCreatorPublish extends React.PureComponent {
  renderButton = (published, handleClick) => (
    <Field helpText={HELP_TEXT}>
      <Button disabled={published} onClick={handleClick}>
        {published ? PUBLISHED_CONTENT : NOT_PUBLISHED_CONTENT}
      </Button>
    </Field>
  );

  render() {
    const { recipeId, published } = this.props;

    return (
      <Mutation mutation={PublishRecipe}>
        {publish =>
          this.renderButton(published, () => {
            publish({ variables: { id: recipeId } });
          })
        }
      </Mutation>
    );
  }
}
