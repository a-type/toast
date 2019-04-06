import React, { FC } from 'react';
import { PlanMealRecipeData } from '../types';
import { RecipeCards } from 'features/recipes';
import { HelpText } from 'components/text';
import { Text, Paragraph, Button } from 'grommet';
import useRecipeCollection from 'features/recipes/useRecipeCollection';
import { Loader } from 'components/generic';
import useAssignMeal from '../useAssignMeal';

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

  const onSelected = async (recipe: PlanMealRecipeData) => {
    await assign({ planMealId, recipeId: recipe.id });
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
    <RecipeCards recipes={likedRecipes} onRecipeSelected={onSelected} />
  ) : (
    <HelpText margin={{ bottom: 'large' }}>
      Like some recipes to make planning easier!
    </HelpText>
  );
};

export default AssignRecipe;
