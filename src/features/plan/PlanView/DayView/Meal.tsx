import React, { SFC, useState } from 'react';
import { PlanMealData, PlanMealRecipeData } from '../../types';
import { Box } from 'grommet';
import { Label } from 'components/text';
import { Card } from 'components/generic';
import { TextSkeleton, CardSkeleton } from 'components/skeletons';
import styled from 'styled-components';
import RecipeSelector from '../RecipeSelector/RecipeSelector';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { MealFragment } from '../../usePlan';
import EmptyMeal from './EmptyMeal';
import RecipeCard from 'features/recipes/RecipeCards/RecipeCard';

const AssignRecipeMutation = gql`
  mutation AssignRecipe($planMealId: ID!, $recipeId: ID!) {
    assignPlanMealRecipe(
      input: { planMealId: $planMealId, recipeId: $recipeId }
    ) {
      id
      ...MealFragment
    }
  }

  ${MealFragment}
`;

const MealBox = styled(Box)`
  & > *:last-child {
    flex: 1;
  }
`;

interface MealProps {
  meal: PlanMealData;
  mealName: string;
}

const Meal: SFC<MealProps> = ({ meal, mealName }) => {
  const assignMutate = useMutation(AssignRecipeMutation);
  const [showSelector, setShowSelector] = useState(false);
  const assignRecipe = async recipeId => {
    await assignMutate({
      variables: { recipeId, planMealId: meal.id },
    });
  };

  const handleSelectRecipe = async (recipe: PlanMealRecipeData) => {
    await assignRecipe(recipe.id);
    setShowSelector(false);
  };

  if (!meal.cooking.length && !meal.eating.length) {
    return (
      <MealBox>
        <Label>{mealName}</Label>
        <EmptyMeal onChooseRecipe={() => setShowSelector(true)} />
        {showSelector && (
          <RecipeSelector
            onChange={handleSelectRecipe}
            onCancel={() => setShowSelector(false)}
          />
        )}
      </MealBox>
    );
  }

  if (meal.cooking.length) {
    return (
      <MealBox>
        <Label>{mealName}</Label>
        <RecipeCard recipe={meal.cooking[0]} />
      </MealBox>
    );
  }

  return (
    <MealBox>
      <Label>{mealName}</Label>
      <Card />
    </MealBox>
  );
};

export const MealSkeleton = () => (
  <MealBox>
    <Label>
      <TextSkeleton />
    </Label>
    <CardSkeleton />
  </MealBox>
);

export default Meal;
