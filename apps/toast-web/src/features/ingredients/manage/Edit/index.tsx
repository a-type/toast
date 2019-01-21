import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Modal, Input, Field } from 'components/generic';
import { Picker } from 'features/ingredients';
import { H3 } from 'components/typeset';
import { Formik } from 'formik';
import { pick } from 'ramda';
import { Ingredient } from 'generated/schema';

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
        <Button onClick={this.toggleModal}>Edit</Button>
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
                      <Input.Block
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                    </Field>
                    <Field label="attribution">
                      <Input.Block
                        name="attribution"
                        value={values.attribution}
                        onChange={handleChange}
                      />
                    </Field>
                    <Button type="submit">Save</Button>
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
