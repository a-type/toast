import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Field } from 'components/generic';
import { Formik } from 'formik';
import { map } from 'ramda';
import { TextArea, TextInput, Button } from 'grommet';

const CreateIngredient = gql`
  mutation CreateIngredient($input: IngredientCreateInput!) {
    createIngredient(input: $input) {
      id
      name
      description
      attribution
    }
  }
`;

const lowerCase = values => map(s => s.toLowerCase(), values);

interface IngredientCreateState {
  error: Error;
  showDone: boolean;
}

export default class IngredientCreate extends React.Component<
  {},
  IngredientCreateState
> {
  state = {
    error: null,
    showDone: false,
  };

  render() {
    const { error, showDone } = this.state;

    return (
      <Mutation mutation={CreateIngredient}>
        {createIngredient => (
          <Formik
            onSubmit={async (values, { resetForm }) => {
              try {
                await createIngredient({
                  variables: { input: lowerCase(values) },
                });
                resetForm();
                this.setState({ showDone: true });
                setTimeout(() => this.setState({ showDone: false }), 3000);
              } catch (err) {
                this.setState({ error: err });
              }
            }}
            initialValues={{ name: '', description: '', attribution: '' }}
          >
            {({ values, handleSubmit, handleChange, dirty }) => (
              <form onSubmit={handleSubmit}>
                <Field label="Name">
                  <TextInput
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Description">
                  <TextArea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Attribution">
                  <TextArea
                    name="attribution"
                    value={values.attribution}
                    onChange={handleChange}
                  />
                </Field>
                <Button
                  type="submit"
                  primary
                  disabled={!dirty}
                  label="Create"
                />
                {showDone && <div>Created!</div>}
                {error && <div>Error: {error.message}</div>}
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}
