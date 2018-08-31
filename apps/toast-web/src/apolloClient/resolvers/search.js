import gql from 'graphql-tag';
import uuid from 'uuid';

export const defaults = {
  searchFilters: [],
  searchInputValue: '',
};

const query = gql`
  query GetSearchFilters {
    searchFilters @client {
      id
      type
      subject
      display
    }
  }
`;

export default {
  Mutation: {
    setSearchInputValue: (_, { value }, { cache }) => {
      cache.writeData({ data: { searchInputValue: value } });
      return value;
    },

    addSearchFilter: (_, { type, subject, display }, { cache }) => {
      const previous = cache.readQuery({ query }).searchFilters;

      const newFilter = {
        id: uuid(),
        type,
        subject,
        display,
        __typename: 'SearchFilter',
      };
      const data = {
        searchFilters: previous.concat([newFilter]),
      };
      cache.writeQuery({ query, data });
      return newFilter;
    },

    removeSearchFilter: (_, { id }, { cache }) => {
      const previous = cache.readQuery({ query }).searchFilters;

      const removed = previous.find(f => f.id === id);
      const data = {
        searchFilters: previous.filter(f => f.id !== id),
      };
      cache.writeQuery({ query, data });
      return removed;
    },

    resetSearch: ({ cache }) => {
      cache.writeData({ data: defaults });

      return null;
    },
  },
};
