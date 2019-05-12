import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Field } from 'components/generic';
import { Formik } from 'formik';
import { pick } from 'ramda';
import { TextArea, Button, Layer, Box, TextInput } from 'grommet';

const EditIngredient = gql`
  mutation EditIngredient($id: ID!, $input: IngredientUpdateInput!) {
    updateIngredient(id: $id, input: $input) {
      id
      name
      description
      attribution
      alternateNames
    }
  }
`;

export interface IngredientEditProps {
  ingredient: any; // FIXME
}

interface IngredientEditState {
  showModal: boolean;
  error: Error;
}

export default class IngredientEdit extends React.Component<
  IngredientEditProps,
  IngredientEditState
> {
  state = {
    showModal: false,
    error: null,
  };

  toggleModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggleModal} label="Edit" />
        <Mutation mutation={EditIngredient}>
          {merge =>
            this.state.showModal && (
              <Layer onClickOutside={this.toggleModal}>
                <Formik
                  initialValues={pick(
                    ['name', 'description', 'attribution'],
                    this.props.ingredient,
                  )}
                  onSubmit={async values => {
                    try {
                      await merge({
                        variables: {
                          input: values,
                          id: this.props.ingredient.id,
                        },
                      });
                      this.setState({ showModal: false });
                    } catch (err) {
                      this.setState({ error: err });
                    }
                  }}
                >
                  {({ values, handleSubmit, handleChange }) => (
                    <form onSubmit={handleSubmit}>
                      <Field label="name" required>
                        <TextInput
                          required
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </Field>
                      <Field label="description">
                        <TextArea
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                        />
                      </Field>
                      <Field label="attribution">
                        <TextArea
                          name="attribution"
                          value={values.attribution}
                          onChange={handleChange}
                        />
                      </Field>
                      <Box direction="row">
                        <Button
                          onClick={() => this.setState({ showModal: false })}
                          label="Cancel"
                          margin={{ right: 'medium' }}
                        />
                        <Button type="submit" primary label="Save" />
                      </Box>
                      {this.state.error && (
                        <div>Error: {this.state.error.message}</div>
                      )}
                    </form>
                  )}
                </Formik>
              </Layer>
            )
          }
        </Mutation>
      </React.Fragment>
    );
  }
}
