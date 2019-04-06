import React, { FC, Fragment } from 'react';
import usePlan from '../usePlan';
import { PlanMealData } from '../types';
import useAssignEating from '../useAssignEating';
import { Box } from 'grommet';
import { HelpText } from 'components/text';
import { formatDate } from 'formatters';
import RecipeCard from 'features/recipes/RecipeCards/RecipeCard';
import { Loader } from 'components/generic';

export interface PreviousMealProps {
  meal: PlanMealData;
  mealDate: Date;
  mealName: string;
  onClick(): void;
}

const PreviousMeal: FC<PreviousMealProps> = ({
  meal,
  mealDate,
  mealName,
  onClick,
}) => {
  const recipe = meal.cooking[0];

  if (!recipe) {
    return null;
  }

  return (
    <Box onClick={onClick}>
      <HelpText>
        {formatDate.formatDay(mealDate)} {mealName}
      </HelpText>
      <Box height="200px">
        <RecipeCard recipe={recipe} />
      </Box>
    </Box>
  );
};

export interface ChoosePreviousMealProps {
  planMealId: string;
}

type MealWithInfo = {
  mealName: string;
  mealDate: Date;
  meal: PlanMealData;
};

export const ChoosePreviousMeal: FC<ChoosePreviousMealProps> = ({
  planMealId,
}) => {
  const [plan, loading] = usePlan();
  const assign = useAssignEating();

  const handleChoice = async mealId => {
    await assign({ planMealId, eatingPlanMealId: mealId });
  };

  if (loading) {
    return <Loader />;
  }

  const validMeals = plan.reduce<MealWithInfo[]>((meals, day) => {
    const date = new Date(day.date);
    if (day.breakfast.cooking.length) {
      meals.push({
        mealName: 'Breakfast',
        mealDate: date,
        meal: day.breakfast,
      });
    }
    if (day.lunch.cooking.length) {
      meals.push({
        mealName: 'Lunch',
        mealDate: date,
        meal: day.lunch,
      });
    }
    if (day.dinner.cooking.length) {
      meals.push({
        mealName: 'Dinner',
        mealDate: date,
        meal: day.dinner,
      });
    }
    return meals;
  }, []);

  if (!validMeals.length) {
    return <HelpText>You haven't planned any meals yet this week</HelpText>;
  }

  return (
    <Box>
      {validMeals.map(meal => (
        <PreviousMeal
          onClick={() => handleChoice(meal.meal.id)}
          {...meal}
          key={meal.meal.id}
        />
      ))}
    </Box>
  );
};

export default ChoosePreviousMeal;
