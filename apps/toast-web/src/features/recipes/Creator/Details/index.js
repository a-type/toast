import React from 'react';
import { Formik } from 'formik';
import gql from 'fraql';
import { Mutation } from 'react-apollo';
import { Form, Input, Button, Field, RadioButton } from 'components/generic';
import { merge } from 'ramda';

export const RecipeCreateDetailsFragment = gql`
  fragment RecipeCreateDetails on Recipe {
    id
    title
    description
    attribution
    sourceUrl
    displayType
    servings
    cookTime
    prepTime
    unattendedTime
  }
`;

const CreateRecipe = gql`
  mutation CreateRecipe($input: RecipeCreateInput!) {
    createRecipe(input: $input) {
      ${RecipeCreateDetailsFragment}
    }
  }
`;

const UpdateRecipe = gql`
  mutation UpdateRecipe($id: ID!, $input: RecipeDetailsUpdateInput!) {
    updateRecipeDetails(id: $id, input: $input) {
      ${RecipeCreateDetailsFragment}
    }
  }
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
        displayType: 'LINK',
        servings: 1,
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
                <Field label="Description">
                  <Input.Block
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Servings">
                  <Input
                    type="number"
                    name="servings"
                    value={values.servings}
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
                <Field label="Cook time (min)">
                  <Input
                    name="cookTime"
                    type="number"
                    min={0}
                    value={values.cookTime}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Prep time (min)">
                  <Input
                    name="prepTime"
                    type="number"
                    min={0}
                    value={values.prepTime}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Unattended time (min)">
                  <Input
                    name="unattendedTime"
                    type="number"
                    min={0}
                    value={values.unattendedTime}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Display type">
                  <RadioButton.Group>
                    <RadioButton
                      name="displayType"
                      value="LINK"
                      checked={values.displayType === 'LINK'}
                      onChange={handleChange}
                    >
                      Link
                    </RadioButton>
                    <RadioButton
                      name="displayType"
                      value="FULL"
                      checked={values.displayType === 'FULL'}
                      onChange={handleChange}
                    >
                      Full
                    </RadioButton>
                  </RadioButton.Group>
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
