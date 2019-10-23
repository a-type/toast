import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

export const GetSubscriptionInfoQuery = gql`
  query GetSubscriptionInfoQuery {
    viewer {
      id
      group {
        id
        subscriptionExpiresAt
      }
    }
  }
`;

export type GetSubscriptionInfoQueryResult = {
  viewer: {
    id: string;
    group?: {
      id: string;
      subscriptionExpiresAt: string;
    };
  };
};

export const useSubscriptionInfo = () => {
  const { data, ...rest } = useQuery<GetSubscriptionInfoQueryResult>(
    GetSubscriptionInfoQuery,
  );

  const expiresAtString = pathOr(
    null,
    ['viewer', 'group', 'subscriptionExpiresAt'],
    data,
  ) as string;
  const expiresAt = expiresAtString ? new Date(expiresAtString) : null;

  return {
    ...rest,
    data: {
      subscribed: !!expiresAt,
      subscriptionExpiresAt: expiresAt,
      canSubscribe: !!pathOr(null, ['viewer', 'group'], data),
    },
  };
};
