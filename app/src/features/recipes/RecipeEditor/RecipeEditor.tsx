import React, { FC, useState } from 'react';
import useEditRecipe from './useEditRecipe';
import { RecipeUpdateInput } from './queries';
import {
  Box,
  Form,
  TextInput,
  TextArea,
  Button,
  Paragraph,
  CheckBox,
  Collapsible,
} from 'grommet';
import { Heading, HelpText, Link } from 'components/text';
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

const emptyRecipe: RecipeUpdateInput = {
  id: null,
  title: '',
  description: '',
  servings: 2,
  cookTime: 0,
  prepTime: 0,
  unattendedTime: 0,
  published: false,
  private: false,
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

  const [showOptional, setShowOptional] = useState(false);

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
              <Field label="Servings" required>
                <TextInput
                  type="number"
                  name="servings"
                  onChange={handleChange}
                  value={values.servings}
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

              <Link onClick={() => setShowOptional(!showOptional)}>
                {showOptional ? 'Hide' : 'Show'} optional fields
              </Link>
              <Collapsible open={showOptional}>
                <Field label="Cook time (minutes)">
                  <TextInput
                    type="number"
                    name="cookTime"
                    onChange={handleChange}
                    value={values.cookTime}
                  />
                </Field>
                <Field label="Prep time (minutes)">
                  <TextInput
                    type="number"
                    name="prepTime"
                    onChange={handleChange}
                    value={values.prepTime}
                  />
                </Field>
                <Field label="Unattended time (minutes)">
                  <TextInput
                    type="number"
                    name="unattendedTime"
                    onChange={handleChange}
                    value={values.unattendedTime}
                  />
                  <HelpText>
                    Unattended time is any time you spend slow cooking, baking,
                    sous vide... any time you don't have to actively do anything
                    during cooking.
                  </HelpText>
                </Field>
              </Collapsible>

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
