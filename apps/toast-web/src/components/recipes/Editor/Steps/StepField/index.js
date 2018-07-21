// @flow
import React from 'react';
import { type RecipeStep } from 'types';
import { Formik } from 'formik';
import { Form, Loader } from 'components/generic';
import { Input, Button } from 'components/typeset';
import Layout from '../common/Layout';
import Number from '../common/Number';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UpdateStep = gql`
  mutation UpdateRecipeStep($recipeId: ID!, $input: RecipeStepUpdateInput!) {
    updateRecipeStep(recipeId: $recipeId, input: $input) {
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
  index: number,
  step: RecipeStep,
  onChange({ id: string, text: string }): mixed,
};

export default class StepField extends React.Component<Props> {
  toggleEditable = () =>
    this.setState(({ editable }) => ({ editable: !editable }));

  render() {
    const { step } = this.props;

    return (
      <Mutation mutation={UpdateStep}>
        {updateStep => {
          const submit = async ({ values }) => {
            await updateStep({
              variables: {
                id: step.id,
                input: values,
              },
            });

            this.setState({ editable: false });
          };

          return (
            <Formik initialValues={{ text: step.step.text }} onSubmit={submit}>
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                <Layout>
                  <Number>
                    {(this.props.step.index && this.props.step.index + 1) || 1}
                  </Number>
                  <Form onSubmit={handleSubmit}>
                    <Form.Field.Group columns={1}>
                      <Form.Field lable="Step">
                        <Input.Block
                          name="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.text}
                        />
                      </Form.Field>
                    </Form.Field.Group>
                    <Form.AutoSave
                      values={values}
                      onSave={submit}
                      render={({ isSaving }) => isSaving && <Loader.Linear />}
                    />
                  </Form>
                </Layout>
              )}
            </Formik>
          );
        }}
      </Mutation>
    );
  }
}
