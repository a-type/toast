import React from 'react';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Field } from 'components/generic';
import { merge } from 'ramda';
import { TextArea, TextInput, Button, RadioButtonGroup } from 'grommet';
import { Recipe } from 'generated/schema';

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

export interface RecipeCreatorDetailsProps {
  recipeId?: string;
  onSave(recipe: Recipe): any;
  initialValues?: Partial<Recipe>;
}

export default class RecipeCreatorDetails extends React.PureComponent<
  RecipeCreatorDetailsProps
> {
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
              if (!result) {
                console.error('No mutation result');
                return;
              } else {
                onSave(result.data[keyName].id);
              }
            }}
          >
            {({ values, handleSubmit, handleChange, dirty }) => (
              <form onSubmit={handleSubmit}>
                <Field label="Title" required>
                  <TextInput
                    required
                    name="title"
                    value={values.title}
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
                <Field label="Servings">
                  <TextInput
                    type="number"
                    name="servings"
                    value={values.servings}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Attribution">
                  <TextInput
                    name="attribution"
                    value={values.attribution}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Source URL">
                  <TextInput
                    name="sourceUrl"
                    value={values.sourceUrl}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Cook time (min)">
                  <TextInput
                    name="cookTime"
                    type="number"
                    min={0}
                    value={values.cookTime}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Prep time (min)">
                  <TextInput
                    name="prepTime"
                    type="number"
                    min={0}
                    value={values.prepTime}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Unattended time (min)">
                  <TextInput
                    name="unattendedTime"
                    type="number"
                    min={0}
                    value={values.unattendedTime}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Display type">
                  <RadioButtonGroup
                    options={[
                      { value: 'LINK', label: 'Link' },
                      { value: 'FULL', label: 'Full' },
                    ]}
                    value={values.displayType}
                    onChange={handleChange}
                    name="displayType"
                  />
                </Field>
                <Field>
                  <Button
                    type="submit"
                    primary
                    disabled={recipeId && !dirty}
                    label={
                      recipeId ? (dirty ? 'Save' : 'Saved') : 'Save & Continue'
                    }
                  />
                </Field>
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}
