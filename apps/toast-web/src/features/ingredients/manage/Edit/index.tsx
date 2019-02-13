import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Modal, Input, Field } from 'components/generic';
import { Formik } from 'formik';
import { pick } from 'ramda';
import { Ingredient } from 'generated/schema';
import { TextArea, Button } from 'grommet';

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
  ingredient: Ingredient;
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
          {merge => (
            <Modal visible={this.state.showModal} onClose={this.toggleModal}>
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
                      <Input
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
                    <Button type="submit" primary label="Save" />
                    {this.state.error && (
                      <div>Error: {this.state.error.message}</div>
                    )}
                  </form>
                )}
              </Formik>
            </Modal>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}
