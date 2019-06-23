import React, { FC } from 'react';
import PlanSummary from 'features/plan/Summary/Summary';
import ShoppingListSummary from 'features/shoppingList/Summary/Summary';
import usePlan from 'features/plan/usePlan';
import useGroceryDay from 'features/plan/useGroceryDay';
import { Loader } from 'components/generic/Loader/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { PlanSetup } from 'features/plan/Setup/Setup';
import PlanView from 'features/plan/PlanView/PlanView';
import { ShoppingList } from 'features/shoppingList/ShoppingList';
import { NavTabs } from 'components/layout/NavTabs';

export const HomePlan = () => {
  const paths = [
    {
      path: '/',
      exact: true,
    },
    {
      path: '/shoppingList',
    },
  ];

  return (
    <NavTabs paths={paths} tabLabels={['Plan', 'Shopping List']}>
      <PlanView />
      <ShoppingList />
    </NavTabs>
  );
};

interface StartPageProps {}

export const StartPage: FC<StartPageProps> = () => {
  const [plan, planLoading, planError, planResult] = usePlan();

  if (planError) {
    return <ErrorMessage full error={planError} />;
  }

  if (planLoading) {
    return <Loader />;
  }

  return !plan.length ? (
    <PlanSetup onCreated={planResult.refetch} />
  ) : (
    <HomePlan />
  );
};

export default StartPage;
