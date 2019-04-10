import React, { FC, useState } from 'react';
import { PlanMealRecipeData } from '../types';
import { RecipeCards } from 'features/recipes';
import { HelpText, Label } from 'components/text';
import { Text, Paragraph, Button, Box, TextInput } from 'grommet';
import useRecipeCollection from 'features/recipes/useRecipeCollection';
import { Loader, Link, Field } from 'components/generic';
import useAssignMeal from '../useAssignMeal';
import useNumberInput from 'hooks/useNumberInput';

interface AssignRecipeProps {
  onRecipeSelected(): void;
  planMealId: string;
}

const AssignRecipe: FC<AssignRecipeProps> = ({
  onRecipeSelected,
  planMealId,
}) => {
  const assign = useAssignMeal();
  const [collections, loading, error, result] = useRecipeCollection();
  const [servings, servingsInputProps] = useNumberInput(2);

  const onSelected = async (recipe: PlanMealRecipeData) => {
    await assign({ planMealId, recipeId: recipe.id, servings });
    onRecipeSelected();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <Text color="status-error">Dangit.</Text>
        <Paragraph>
          We couldn't load your recipes. That's almost definitely our bad. Maybe
          retrying will help?
        </Paragraph>
        <Button onClick={() => result.refetch()} label="Retry" />
      </>
    );
  }

  const { likedRecipes } = collections;

  return likedRecipes.length ? (
    <>
      <Box margin={{ bottom: 'medium' }}>
        <Field label="Servings" required>
          <TextInput {...servingsInputProps} />
        </Field>
      </Box>
      <RecipeCards recipes={likedRecipes} onRecipeSelected={onSelected} />
    </>
  ) : (
    <HelpText margin={{ bottom: 'large' }}>
      Find some recipes first so you can start planning!
      <Link to="/recipes/find">
        <Button label="Start adding recipes" />
      </Link>
    </HelpText>
  );
};

export default AssignRecipe;
