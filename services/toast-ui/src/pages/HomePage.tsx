import React, { FC, useState } from 'react';
import usePlan from 'hooks/features/usePlan';
import { Loader } from 'components/generic/Loader/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import { PlanSetup } from 'components/features/PlanSetup';
import { Container, Button, Typography } from '@material-ui/core';
import { PlanFeed } from 'components/features/PlanFeed';
import { NetworkStatus, ApolloError } from 'apollo-client';
import { startOfToday, subDays } from 'date-fns';
import Popup from 'components/generic/Popup';
import { ShoppingList } from 'components/features/ShoppingList';
import { Center } from 'components/layout/Center';
import Link from 'components/generic/Link';

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

  if (networkStatus === NetworkStatus.loading) {
    return <Loader />;
  }

  if (error || (data && !data.viewer.group)) {
    if ((data && !data.viewer.group) || isUnsubscribedError(error)) {
      return (
        <Center title="Subscription needed">
          <Typography paragraph>
            To use this feature, you need to be subscribed to Toast.
          </Typography>
          <Button
            component={Link}
            to="/subscription"
            variant="contained"
            color="primary"
          >
            Manage Subscription
          </Button>
        </Center>
      );
    }

    return <ErrorMessage full error={error} />;
  }

  return (
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

const isUnsubscribedError = (error: ApolloError) =>
  error.graphQLErrors.length &&
  error.graphQLErrors[0] &&
  error.graphQLErrors[0].extensions.code === 'UNSUBSCRIBED';

const getWasSubscribed = (error: ApolloError) => error.extraInfo.wasSubscribed;
