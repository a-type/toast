// @flow
import React from 'react';
import { Formik } from 'formik';
import { Form } from 'components/generic';
import { Input, Button } from 'components/typeset';
import Layout from '../common/Layout';
import Number from '../common/Number';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CreateStep = gql`
  mutation CreateRecipeStep($recipeId: ID!, $input: RecipeStepCreateInput!) {
    createRecipeStep(recipeId: $recipeId, input: $input) {
      id
      index
      step {
        id
        text
      }
    }
  }
`;

type Props = {
  recipeId: string,
  onCreate({ text: string }): mixed,
  index: number,
};

type State = {
  active: boolean,
};

export default class AddStep extends React.Component<Props, State> {
  state = {
    active: false,
  };

  toggleActive = () => this.setState(({ active }) => ({ active: !active }));

  render() {
    const { recipeId, index } = this.props;
    const { active } = this.state;

    if (!active) {
      return <Button.Ghost onClick={this.toggleActive}>Add step</Button.Ghost>;
    }

    return (
      <Mutation mutation={CreateStep}>
        {createStep => (
          <Formik
            onSubmit={async (
              values,
              { setErrors, setSubmitting, setValues },
            ) => {
              setSubmitting(true);
              await createStep({
                variables: {
                  recipeId,
                  input: {
                    text: values.text,
                  },
                },
              });
              setSubmitting(false);
            }}
            initialValues={{ text: '' }}
          >
            {({ values, errors, handleChange, handleSubmit, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <Layout>
                  <Number>{index + 1}</Number>
                  <Form.Field.Group columns={1}>
                    <Form.Field>
                      <Input.Block
                        value={values.text}
                        name="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Button type="submit">Add step</Button>
                    </Form.Field>
                  </Form.Field.Group>
                </Layout>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}
