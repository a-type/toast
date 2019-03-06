import React, { SFC, useState } from 'react';
import { PlanMeal, Recipe } from '../types';
import { Box, Text, Button } from 'grommet';
import { Label, Link } from 'components/text';
import { Card } from 'components/generic';
import { TextSkeleton, CardSkeleton } from 'components/skeletons';
import styled from 'styled-components';
import RecipeSelector from '../RecipeSelector/RecipeSelector';
import { pathOr } from 'ramda';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

export const MealFragment = gql`
  fragment MealRecipeFragment on Recipe {
    id
    title
    coverImage {
      id
      url
    }
  }

  fragment MealFragment on PlanMeal {
    id

    cooking {
      ...MealRecipeFragment
    }

    eating {
      id

      cooking {
        ...MealRecipeFragment
      }
    }
  }
`;

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

interface CookingSectionProps {
  cooking: Recipe[];
  assignRecipe(recipeId: string): Promise<any>;
}

const CookingSection: SFC<CookingSectionProps> = ({
  cooking,
  assignRecipe,
}) => {
  const [showSelector, setShowSelector] = useState(false);

  const handleSelectRecipe = async (recipe: Recipe) => {
    await assignRecipe(recipe.id);
    setShowSelector(false);
  };

  const mainContent =
    cooking && cooking.length ? (
      <>
        <Text>
          Cooking:{' '}
          <Link to={`/recipes/${cooking[0].id}`}>{cooking[0].title}</Link>
        </Text>
        <Button onClick={() => setShowSelector(true)} label="Change recipe" />
      </>
    ) : (
      <Button onClick={() => setShowSelector(true)} label="Cook something" />
    );

  return (
    <>
      {mainContent}
      {showSelector && (
        <RecipeSelector
          onChange={handleSelectRecipe}
          onCancel={() => setShowSelector(false)}
        />
      )}
    </>
  );
};

interface MealProps {
  meal: PlanMeal;
  mealName: string;
}

const Meal: SFC<MealProps> = ({ meal, mealName }) => {
  const assignMutate = useMutation(AssignRecipeMutation);

  return (
    <MealBox>
      <Label>{mealName}</Label>
      <Card imageSrc={pathOr(null, ['cooking', 0, 'coverImage', 'url'], meal)}>
        <CookingSection
          cooking={meal.cooking}
          assignRecipe={async recipeId => {
            await assignMutate({
              variables: { recipeId, planMealId: meal.id },
            });
          }}
        />
      </Card>
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
