import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Field, FileInput } from 'components/generic';
import { Formik } from 'formik';
import { pathOr } from 'ramda';
import { Button, TextInput } from 'grommet';

const HAS_IMAGE_CONTENT = 'Change image';
const NO_IMAGE_CONTENT = 'Choose image';

export const RecipeCreateImageFragment = gql`
  fragment RecipeCreateImage on Recipe {
    id
    coverImage {
      id
      url
      attribution
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

export interface RecipeCreatorImagesProps {
  recipeId: string;
  coverImage?: {
    url: string;
    attribution?: string;
  };
}

export default class RecipeCreatorImages extends React.PureComponent<
  RecipeCreatorImagesProps
> {
  state = {
    saving: false,
  };

  render() {
    const { recipeId, coverImage } = this.props;

    return (
      <Mutation mutation={UpdateImage}>
        {update => (
          <Formik
            onSubmit={async data => {
              this.setState({ saving: true });
              try {
                await update({
                  variables: {
                    id: recipeId,
                    input: {
                      file: data.image instanceof Blob ? data.image : undefined,
                      attribution: data.attribution,
                    },
                  },
                });
              } finally {
                this.setState({ saving: false });
              }
            }}
            initialValues={{
              image: pathOr(null, ['url'], coverImage),
              attribution: pathOr('', ['attribution'], coverImage),
            }}
          >
            {({ handleSubmit, handleChange, values, setFieldValue, dirty }) => (
              <form onSubmit={handleSubmit}>
                <Field label="Cover image">
                  <FileInput
                    name="image"
                    value={values.image}
                    onChange={image => setFieldValue('image', image)}
                    label={!coverImage ? HAS_IMAGE_CONTENT : NO_IMAGE_CONTENT}
                  />
                </Field>
                <Field label="Attribution">
                  <TextInput
                    name="attribution"
                    value={values.attribution}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Button
                    type="submit"
                    disabled={!dirty || this.state.saving}
                    label="Save"
                    primary
                  />
                </Field>
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}
