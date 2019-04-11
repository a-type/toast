import React, { FC, useState } from 'react';
import { PlanMealRecipeData } from '../types';
import { RecipeCards } from 'features/recipes';
import { HelpText, Label } from 'components/text';
import { Text, Paragraph, Button, Box, TextInput } from 'grommet';
import { Loader, Link, Field } from 'components/generic';
import useAssignMeal from '../useAssignMeal';
import useNumberInput from 'hooks/useNumberInput';
import useSavedRecipes from 'features/recipes/useSavedRecipes';

interface AssignRecipeProps {
  onRecipeSelected(): void;
  planMealId: string;
}

const AssignRecipe: FC<AssignRecipeProps> = ({
  onRecipeSelected,
  planMealId,
}) => {
  const assign = useAssignMeal();
  const [saved, loading, error, result] = useSavedRecipes();
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

  return saved.length ? (
    <>
      <Box margin={{ bottom: 'medium' }}>
        <Field label="Servings" required>
          <TextInput {...servingsInputProps} />
        </Field>
      </Box>
      <RecipeCards
        recipes={saved.map(saved => saved.recipe)}
        onRecipeSelected={onSelected}
      />
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
