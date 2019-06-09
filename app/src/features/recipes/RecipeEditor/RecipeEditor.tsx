import React, { FC, useState } from 'react';
import useEditRecipe from './useEditRecipe';
import { RecipeUpdateInput } from './queries';
import { path } from 'ramda';
import { Formik } from 'formik';
import RecipeIngredientsEditor from './RecipeIngredientsEditor';
import { GlobalLoader } from 'components/generic/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { RecipeStepsEditor } from './RecipeStepsEditor';
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import Link from 'components/text/Link';
import Icon from 'components/generic/Icon';

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
              color: 'var(--color-error)',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            <Icon name="label" /> Draft
          </span>
        )}
        {!published && (
          <Box>
            <Button variant="contained" color="primary" onClick={publish}>
              Publish
            </Button>
            <Typography>
              Your recipe is unpublished. Publish it so you can start using it!
            </Typography>
          </Box>
        )}
        <Formik
          initialValues={recipe || emptyRecipe}
          enableReinitialize
          onSubmit={save}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                required
                label="Title"
                css={{ fontSize: '64px' }}
                value={values.title}
                onChange={handleChange}
                name="title"
              />
              <TextField
                label="Description"
                name="description"
                onChange={handleChange}
                value={values.description}
              />
              <TextField
                label="Servings"
                type="number"
                name="servings"
                onChange={handleChange}
                value={values.servings}
              />

              <FormControlLabel
                label="Private"
                control={
                  <Checkbox
                    name="private"
                    onChange={handleChange}
                    checked={values.private}
                  />
                }
              />
              <Typography variant="caption">
                Private recipes can only be seen by you and other members of
                your plan
              </Typography>

              <Link onClick={() => setShowOptional(!showOptional)}>
                {showOptional ? 'Hide' : 'Show'} optional fields
              </Link>
              <ExpansionPanel>
                <ExpansionPanelSummary>
                  <Typography>Optional fields</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <TextField
                    label="Cook time (minutes)"
                    type="number"
                    name="cookTime"
                    onChange={handleChange}
                    value={values.cookTime}
                  />
                  <TextField
                    label="Prep time (minutes)"
                    type="number"
                    name="prepTime"
                    onChange={handleChange}
                    value={values.prepTime}
                  />
                  <TextField
                    label="Unattended time (minutes)"
                    type="number"
                    name="unattendedTime"
                    onChange={handleChange}
                    value={values.unattendedTime}
                  />
                  <Typography variant="caption">
                    Unattended time is any time you spend slow cooking, baking,
                    sous vide... any time you don't have to actively do anything
                    during cooking.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <Button variant="contained" color="primary" type="submit">
                {!recipeId ? 'Continue' : 'Save'}
              </Button>
            </form>
          )}
        </Formik>
      </Box>

      {recipe && (
        <>
          <Typography variant="h3">Ingredients</Typography>
          <RecipeIngredientsEditor
            recipe={recipe}
            createIngredient={createIngredient}
            refetchRecipe={refetchRecipe}
          />
          <Typography variant="h3">Steps</Typography>
          <RecipeStepsEditor recipe={recipe} updateRecipe={save} />
        </>
      )}
    </Box>
  );
};

export default RecipeEditor;
