import React, { FC } from 'react';
import PlanSummary from 'features/plan/Summary/Summary';
import Column from 'components/layout/Column';
import ShoppingListSummary from 'features/shoppingList/Summary/Summary';
import RecipesSummary from 'features/recipes/Summary/Summary';
import { Heading } from 'grommet';
import usePlan from 'features/plan/usePlan';
import useGroceryDay from 'features/plan/useGroceryDay';
import useSavedRecipes from 'features/recipes/useSavedRecipes';
import OnboardingPage from './OnboardingPage';
import { GlobalLoader } from 'components/generic/Loader';

interface StartPageProps {}

export const StartPage: FC<StartPageProps> = ({}) => {
  const [plan, planLoading, planError, planResult] = usePlan();
  const [groceryDay, groceryDayLoading, groceryDayError] = useGroceryDay();
  const [
    savedRecipes,
    savedRecipesLoading,
    savedRecipesError,
  ] = useSavedRecipes();

  if (planLoading || groceryDayLoading || savedRecipesLoading) {
    return <GlobalLoader />;
  }

  if (!plan.length) {
    return <OnboardingPage onCreated={planResult.refetch} />;
  }

  return (
    <Column>
      <PlanSummary loading={planLoading} planDays={plan} error={planError} />
      <Heading level="3">Shopping</Heading>
      <ShoppingListSummary
        loading={groceryDayLoading}
        groceryDay={groceryDay}
        error={groceryDayError}
      />
      <Heading level="3">Recipes</Heading>
      <RecipesSummary
        savedRecipes={savedRecipes}
        loading={savedRecipesLoading}
        error={savedRecipesError}
      />
    </Column>
  );
};

export default StartPage;
