import React from 'react';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Form, Input, Button, Field } from 'components/generic';
import { merge } from 'ramda';

export const RecipeCreateDetailsFragment = gql`
  fragment RecipeCreateDetails on Recipe {
    id
    title
    description
    attribution
    sourceUrl
    displayType
  }
`;

const CreateRecipe = gql`
  mutation CreateRecipe($input: RecipeCreateInput!) {
    createRecipe(input: $input) {
      ...RecipeCreateDetails
    }
  }

  ${RecipeCreateDetailsFragment}
`;

const UpdateRecipe = gql`
  mutation UpdateRecipe($id: ID!, $input: RecipeDetailsUpdateInput!) {
    updateRecipeDetails(id: $id, input: $input) {
      ...RecipeCreateDetails
    }
  }

  ${RecipeCreateDetailsFragment}
`;

export default class RecipeCreatorDetails extends React.PureComponent {
  render() {
    const { recipeId, onSave, initialValues } = this.props;

    const defaultedInitialValues = merge(
      {
        title: '',
        description: '',
        attribution: '',
        sourceUrl: '',
      },
      initialValues,
    );

    return (
      <Mutation mutation={recipeId ? UpdateRecipe : CreateRecipe}>
        {save => (
          <Formik
            initialValues={defaultedInitialValues}
            onSubmit={async values => {
              const result = await save({
                variables: { id: recipeId, input: values },
              });
              const keyName = recipeId ? 'updateRecipeDetails' : 'createRecipe';
              onSave(result.data[keyName].id);
            }}
          >
            {({ values, handleSubmit, handleChange, dirty }) => (
              <Form onSubmit={handleSubmit}>
                <Field label="Title" required>
                  <Input
                    required
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Description" columnSpan={2}>
                  <Input.Block
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Attribution">
                  <Input
                    name="attribution"
                    value={values.attribution}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Source URL">
                  <Input
                    name="sourceUrl"
                    value={values.sourceUrl}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <Button type="submit" disabled={recipeId && !dirty}>
                    {recipeId ? (dirty ? 'Save' : 'Saved') : 'Save & Continue'}
                  </Button>
                </Field>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}
