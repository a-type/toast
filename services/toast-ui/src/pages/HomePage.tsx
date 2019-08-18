import React, { FC, useState } from 'react';
import usePlan from 'hooks/features/usePlan';
import { Loader } from 'components/generic/Loader/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { PlanSetup } from 'components/features/PlanSetup';
import { Container } from '@material-ui/core';
import { PlanFeed } from 'components/features/PlanFeed';
import { NetworkStatus } from 'apollo-client';
import { startOfToday, subDays } from 'date-fns';

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const [startDate, setStartDate] = useState(startOfToday());
  const {
    data,
    networkStatus,
    error,
    refetch,
    hasNextPage,
    fetchMore,
  } = usePlan({
    filter: {
      dateAfter: subDays(startDate, 1),
    },
    first: 28,
  });

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
      <PlanFeed
        mealEdges={data.viewer.group.planMealsConnection.edges}
        groupId={data.viewer.group.id}
        refetch={refetch}
        startDate={startDate}
        hasNextPage={hasNextPage}
        fetchMore={fetchMore}
      />
    </Container>
  );
};
