import React from 'react';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Form, Input, Button } from 'components/generic';
import { merge } from 'ramda';

const RecipeDetailsFragment = gql`
  fragment RecipeDetails on Recipe {
    id
    title
    description
    attribution
    sourceUrl
  }
`;

const CreateRecipe = gql`
  mutation CreateRecipe($input: RecipeCreateInput!) {
    createRecipe(input: $input) {
      ...RecipeDetails
    }
  }

  ${RecipeDetailsFragment}
`;

const UpdateRecipe = gql`
  mutation UpdateRecipe($id: ID!, $input: RecipeDetailsUpdateInput!) {
    updateRecipeDetails(id: $id, input: $input) {
      ...RecipeDetails
    }
  }

  ${RecipeDetailsFragment}
`;

export default class RecipeCreatorDetails extends React.PureComponent {
  render() {
    const { recipeId, onCreate, initialValues } = this.props;

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
              if (!recipeId) {
                onCreate(result.data.createRecipe.id);
              }
            }}
          >
            {({ values, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Field.Group columns={1}>
                  <Form.Field label="Title" required>
                    <Input.H1
                      required
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                    />
                  </Form.Field>
                  <Form.Field label="Description">
                    <Input.Block
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                    />
                  </Form.Field>
                  <Form.Field label="Attribution">
                    <Input
                      name="attribution"
                      value={values.attribution}
                      onChange={handleChange}
                    />
                  </Form.Field>
                  <Form.Field label="Source URL">
                    <Input
                      name="sourceUrl"
                      value={values.sourceUrl}
                      onChange={handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button type="submit">
                      {recipeId ? 'Next' : 'Save & Continue'}
                    </Button>
                  </Form.Field>
                </Form.Field.Group>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}
