import gql from 'fraql';

export const defaults = {
  preferredServings: null,
};

export default {
  Mutation: {
    setPreferredServings: (_, { servings }, { cache }) => {
      cache.writeData({ data: { preferredServings: servings } });
      return servings;
    },
  },
};
