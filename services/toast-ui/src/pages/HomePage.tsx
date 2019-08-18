import React, { FC, useState } from 'react';
import usePlan from 'hooks/features/usePlan';
import { Loader } from 'components/generic/Loader/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { PlanSetup } from 'components/features/PlanSetup';
import { Container, Button } from '@material-ui/core';
import { PlanFeed } from 'components/features/PlanFeed';
import { NetworkStatus } from 'apollo-client';
import { startOfToday, subDays } from 'date-fns';
import Popup from 'components/generic/Popup';
import { ShoppingList } from 'components/features/ShoppingList';

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
  const [showShoppingList, setShowShoppingList] = useState(false);

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
      <Button variant="contained" onClick={() => setShowShoppingList(true)}>
        Shopping list
      </Button>
      <PlanFeed
        mealEdges={data.viewer.group.planMealsConnection.edges}
        groupId={data.viewer.group.id}
        refetch={refetch}
        startDate={startDate}
        hasNextPage={hasNextPage}
        fetchMore={fetchMore}
      />
      <Popup
        open={showShoppingList}
        onClose={() => setShowShoppingList(false)}
        title="Shopping list"
      >
        {showShoppingList && <ShoppingList />}
      </Popup>
    </Container>
  );
};
