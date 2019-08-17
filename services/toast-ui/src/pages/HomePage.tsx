import React, { FC } from 'react';
import usePlan, { GroupPlanMealEdge } from 'hooks/features/usePlan';
import { Loader } from 'components/generic/Loader/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { PlanSetup } from 'components/features/PlanSetup';
import { Container } from '@material-ui/core';
import { PlanFeed } from 'components/features/PlanFeed';
import { NetworkStatus } from 'apollo-client';

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const { data, networkStatus, error, refetch } = usePlan();

  if (error) {
    return <ErrorMessage full error={error} />;
  }

  if (networkStatus === NetworkStatus.loading) {
    return <Loader />;
  }

  return !data.viewer.group ? (
    <Container>
      <PlanSetup onCreated={refetch} />
    </Container>
  ) : (
    <Container>
      <HomePlan
        plan={data.viewer.group.planMealsConnection.edges}
        groupId={data.viewer.group.id}
        refetch={refetch}
      />
    </Container>
  );
};

export const HomePlan: FC<{
  plan: GroupPlanMealEdge[];
  groupId;
  refetch: () => any;
}> = ({ plan, groupId, refetch }) => (
  <PlanFeed mealEdges={plan} groupId={groupId} refetch={refetch} />
);
