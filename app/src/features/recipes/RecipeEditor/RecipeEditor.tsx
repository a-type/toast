import React, { FC } from 'react';
import useEditRecipe from './useEditRecipe';
import { EditRecipeRecipe } from './queries';
import {
  Box,
  Form,
  TextInput,
  TextArea,
  Button,
  Paragraph,
  CheckBox,
} from 'grommet';
import { Heading, HelpText } from 'components/text';
import { path } from 'ramda';
import { Formik } from 'formik';
import { Field, Icon } from 'components/generic';
import RecipeIngredientsEditor from './RecipeIngredientsEditor';
import { GlobalLoader } from 'components/generic/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { RecipeStepsEditor } from './RecipeStepsEditor';

export interface RecipeEditorProps {
  recipeId?: string;
}

const emptyRecipe: EditRecipeRecipe = {
  id: null,
  title: '',
  description: '',
  servings: 2,
  cookTime: 0,
  prepTime: 0,
  unattendedTime: 0,
  published: false,
  ingredients: [],
  steps: [],
};

export const RecipeEditor: FC<RecipeEditorProps> = ({ recipeId }) => {
  const {
    recipe,
    initializing,
    saving,
    save,
    error,
    createIngredient,
    refetchRecipe,
    publish,
  } = useEditRecipe({
    recipeId,
  });

  if (initializing) {
    return <GlobalLoader />;
  }

  const published = !!path(['published'], recipe);

  return (
    <Box>
      {error && <ErrorMessage error={error} />}
      <Box>
        {!!(!published && recipeId) && (
          <span
            css={{
              fontSize: '18px',
              color: 'var(--color-negative)',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            <Icon name="label" /> Draft
          </span>
        )}
        {!published && (
          <Box>
            <Button primary onClick={publish} label="Publish" />
            <Paragraph>
              Your recipe is unpublished. Publish it so you can start using it!
            </Paragraph>
          </Box>
        )}
        <Formik
          initialValues={recipe || emptyRecipe}
          enableReinitialize
          onSubmit={save}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field label="Title" required>
                <TextInput
                  size="xlarge"
                  value={values.title}
                  onChange={handleChange}
                  name="title"
                />
              </Field>
              <Field label="Description">
                <TextArea
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                />
              </Field>
              <Field>
                <CheckBox
                  name="private"
                  onChange={handleChange}
                  checked={values.private}
                  label="Private recipe"
                />
                <HelpText>
                  Private recipes can only be seen by you and other members of
                  your plan
                </HelpText>
              </Field>

              <Button type="submit" label={!recipeId ? 'Continue' : 'Save'} />
            </Form>
          )}
        </Formik>
      </Box>

      {recipe && (
        <>
          <Heading level="3">Ingredients</Heading>
          <RecipeIngredientsEditor
            recipe={recipe}
            createIngredient={createIngredient}
            refetchRecipe={refetchRecipe}
          />
          <Heading level="3">Steps</Heading>
          <RecipeStepsEditor recipe={recipe} />
        </>
      )}
    </Box>
  );
};

export default RecipeEditor;
