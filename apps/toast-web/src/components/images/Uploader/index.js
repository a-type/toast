// @flow
import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import { Form, Button } from '../../generic';
import { path } from 'ramda';
import { type Image } from 'types';

type Props = {
  onImageCreated(image: Image): any,
};

const UploadImage = gql`
  mutation UploadImage($file: Upload!) {
    createImage(file: $file) {
      id
      url
    }
  }
`;

export default class Uploader extends React.PureComponent<Props, *> {
  render() {
    const { onImageCreated } = this.props;
    return (
      <Mutation mutation={UploadImage}>
        {uploadImage => (
          <Formik
            onSubmit={async values => {
              const result = await uploadImage({ variables: values });
              onImageCreated(result.createImage);
            }}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit}>
                <input
                  type="file"
                  onChange={ev => {
                    if (!ev.target.files) {
                      setFieldValue('file', null);
                    }

                    setFieldValue('file', ev.target.files[0]);
                  }}
                  name="file"
                />
                <Button type="submit">Upload</Button>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}
