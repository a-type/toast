import React, { FC } from 'react';
import usePlan from 'features/plan/usePlan';
import { Loader } from 'components/generic/Loader/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { PlanSetup } from 'features/plan/Setup/Setup';
import PlanView from 'features/plan/PlanView/PlanView';
import { ShoppingList } from 'features/shoppingList/ShoppingList';
import { NavTabs } from 'components/layout/NavTabs';
import { pathOr } from 'ramda';
import { SubscriptionSignup } from 'features/subscription/SubscriptionSignup';

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
    <NavTabs paths={paths} tabLabels={['Plan', 'Shopping List']}>
      <PlanView />
      <ShoppingList />
    </NavTabs>
  );
};

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const { data, loading: planLoading, error: planError, refetch } = usePlan();

  console.log(data);

  if (planError) {
    return <ErrorMessage full error={planError} />;
  }

  if (planLoading) {
    return <Loader />;
  }

  if (!data.stripeSubscriptionId) {
    // unsubscribed user
    return <SubscriptionSignup />;
  }

  const plan = pathOr([], ['planDaysConnection', 'nodes'], data);

  return !plan.length ? <PlanSetup onCreated={refetch} /> : <HomePlan />;
};

export default HomePage;
