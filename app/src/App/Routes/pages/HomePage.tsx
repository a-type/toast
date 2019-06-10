import React, { FC } from 'react';
import usePlan from 'features/plan/usePlan';
import { GlobalLoader } from 'components/generic/Loader/GlobalLoader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { PlanSetup } from 'features/plan/Setup/Setup';
import PlanView from 'features/plan/PlanView/PlanView';
import { ShoppingList } from 'features/shoppingList/ShoppingList';
import { NavTabs } from 'components/layout/NavTabs';
import { Container } from '@material-ui/core';

export const HomePlan = () => {
  const paths = [
    {
      path: '/home',
      exact: true,
    },
    {
      path: '/home/shoppingList',
    },
  ];

  return (
    <NavTabs paths={paths} tabLabels={['Home', 'Shopping List']}>
      <PlanView />
      <ShoppingList />
    </NavTabs>
  );
};

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const [plan, planLoading, planError, planResult] = usePlan();

  if (planError) {
    return <ErrorMessage full error={planError} />;
  }

  if (planLoading) {
    return <GlobalLoader />;
  }

  return !plan.length ? (
    <Container>
      <PlanSetup onCreated={planResult.refetch} />
    </Container>
  ) : (
    <HomePlan />
  );
};

export default HomePage;
