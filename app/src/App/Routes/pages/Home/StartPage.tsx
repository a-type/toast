import React, { FC } from 'react';
import PlanSummary from 'features/plan/Summary/Summary';
import Column from 'components/layout/Column';
import ShoppingListSummary from 'features/shoppingList/Summary/Summary';
import RecipesSummary from 'features/recipes/Summary/Summary';
import { Heading } from 'grommet';
import usePlan from 'features/plan/usePlan';
import useGroceryDay from 'features/plan/useGroceryDay';
import useSavedRecipes from 'features/recipes/useSavedRecipes';
import { GlobalLoader } from 'components/generic/Loader/GlobalLoader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { PlanSetup } from 'features/plan/Setup/Setup';

interface StartPageProps {}

export const StartPage: FC<StartPageProps> = ({}) => {
  const [plan, planLoading, planError, planResult] = usePlan();
  const [groceryDay, groceryDayLoading, groceryDayError] = useGroceryDay();
  const [
    savedRecipes,
    savedRecipesLoading,
    savedRecipesError,
  ] = useSavedRecipes();

  const anyLoading = planLoading || groceryDayLoading || savedRecipesLoading;
  const allLoading = planLoading && groceryDayLoading && savedRecipesLoading;

  if (planError) {
    return <ErrorMessage full error={planError} />;
  }

  const mainContent = allLoading ? null : !planLoading && !plan.length ? (
    <PlanSetup onCreated={planResult.refetch} />
  ) : (
    <>
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
    </>
  );

  return (
    <Column>
      {anyLoading && <GlobalLoader full={allLoading} />}
      {mainContent}
    </Column>
  );
};

export default StartPage;
