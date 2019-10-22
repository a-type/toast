import React, { useState } from 'react';
import usePlan from 'hooks/features/usePlan';
import { Loader } from 'components/Loader/Loader';
import ErrorMessage from 'components/ErrorMessage';
import {
  Container,
  Button,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';
import { PlanFeed } from 'components/plan/PlanFeed';
import { NetworkStatus, ApolloError } from 'apollo-client';
import { startOfToday, subDays } from 'date-fns';
import { Center } from 'components/layout/Center';
import Link from 'components/Link';
import { NextPage } from 'next';
import { ensureLoggedIn } from 'lib/auth';

const useStyles = makeStyles(theme => ({
  title: {
    flex: '1',
  },
}));

const PlanPage: NextPage = () => {
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
  const classes = useStyles({});

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
            to="/settings/subscription"
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
      <Box display="flex" flexDirection="row" alignItems="center" mb={3}>
        <Typography variant="h2" component="h1" className={classes.title}>
          Plan
        </Typography>
      </Box>
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

PlanPage.getInitialProps = async ctx => {
  await ensureLoggedIn(ctx);
  return {};
};

export default PlanPage;

const isUnsubscribedError = (error: ApolloError) =>
  error.graphQLErrors.length &&
  error.graphQLErrors[0] &&
  error.graphQLErrors[0].extensions.code === 'UNSUBSCRIBED';

const getWasSubscribed = (error: ApolloError) => error.extraInfo.wasSubscribed;
