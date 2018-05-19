// @flow
import React from 'react';
import { type Image } from 'types';
import Chooser from 'components/images/Chooser';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Control from './Control';

const UpdateImage = gql`
  mutation UpdateRecipeImage($file: Upload!, $id: ID!) {
    updateRecipe(input: { coverImage: { file: $file } }, id: $id) {
      id
      coverImage {
        id
        url
      }
    }
  }
`;

type Props = {
  recipeId: string,
};

type State = {
  loading: boolean,
};

export default class RecipeCoverImageChanger extends React.PureComponent<
  Props,
  State,
> {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;

    return (
      <Mutation mutation={UpdateImage}>
        {updateImage => (
          <Chooser
            onImageChange={async image => {
              if (image) {
                console.log(image);
                this.setState({ loading: true });
                await updateImage({
                  variables: { file: image, id: this.props.recipeId },
                });
                this.setState({ loading: false });
              }
            }}
          >
            <Control loading={loading} />
          </Chooser>
        )}
      </Mutation>
    );
  }
}
