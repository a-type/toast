import React from 'react';
import Scanner from './Scanner';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const GetPromotions = gql`
  query GetPromotions {
    promotions @client
  }
`;

const DismissPromotion = gql`
  mutation DismissPromotion($id: ID!) {
    dismissPromotion(id: $id) @client
  }
`;

const promotionContents = {
  scanner: Scanner,
};

export const PrioritizedPromotion = () => (
  <Mutation mutation={DismissPromotion}>
    {mutate => (
      <Query query={GetPromotions}>
        {({ data, loading, error }) => {
          if (loading || error) {
            return null;
          }

          for (let i = 0; i < data.promotions.length; i++) {
            const Promotion = promotionContents[data.promotions[i]];
            const dismiss = () =>
              mutate({ variables: { id: data.promotions[i] } });
            const rendered = <Promotion onAcknowledge={dismiss} />;

            if (rendered) {
              return rendered;
            }
          }

          return null;
        }}
      </Query>
    )}
  </Mutation>
);
