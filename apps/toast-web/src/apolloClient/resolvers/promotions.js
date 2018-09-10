import uuid from 'uuid';
import gql from 'graphql-tag';
import { difference } from 'ramda';

const PROMOTION_STORAGE_KEY = 'toast_seen_promotions';
const ALL_PROMOTIONS = ['scanner'];

const loadPromotions = () => {
  const seenList = localStorage.getItem(PROMOTION_STORAGE_KEY) || '';
  return difference(ALL_PROMOTIONS, seenList.split(','));
};

const setSeenPromotion = promotionId => {
  const seenList = localStorage.getItem(PROMOTION_STORAGE_KEY) || '';
  localStorage.setItem(PROMOTION_STORAGE_KEY, seenList + ',' + promotionId);
};

export const defaults = {
  promotions: loadPromotions(),
};

const query = gql`
  query GetPromotions {
    promotions @client
  }
`;

export default {
  Mutation: {
    dismissPromotion: (_, { id }, { cache }) => {
      const previous = cache.readQuery({ query }).promotions;

      const promotions = previous.filter(m => m !== id);

      const data = {
        promotions,
      };

      cache.writeQuery({ query, data });
      setSeenPromotion(id);

      return id;
    },
  },
};
