import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Chooser } from 'features/images';
import { Button, Field } from 'components/generic';

const HAS_IMAGE_CONTENT = 'Change image';
const NO_IMAGE_CONTENT = 'Choose image';

export const RecipeCreateImageFragment = gql`
  fragment RecipeCreateImage on Recipe {
    id
    coverImage {
      id
      url
    }
  }
`;

const UpdateImage = gql`
  mutation UpdateRecipeCoverImage($id: ID!, $input: ImageCreateInput!) {
    updateRecipeCoverImage(id: $id, input: $input) {
      ...RecipeCreateImage
    }
  }

  ${RecipeCreateImageFragment}
`;

export default class RecipeCreatorImages extends React.PureComponent {
  render() {
    const { recipeId, coverImage } = this.props;

    return (
      <Mutation mutation={UpdateImage}>
        {update => (
          <Field label="Cover image">
            <Chooser
              onImageChange={image =>
                update({ variables: { id: recipeId, input: { file: image } } })
              }
            >
              <div>{!coverImage ? HAS_IMAGE_CONTENT : NO_IMAGE_CONTENT}</div>
            </Chooser>
          </Field>
        )}
      </Mutation>
    );
  }
}
