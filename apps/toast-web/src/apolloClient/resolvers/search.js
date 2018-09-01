import gql from 'graphql-tag';
import uuid from 'uuid';
import queryString from 'query-string';
import browserHistory from '../../browserHistory';

const initial = {
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

const writeToQuery = filters => {
  const search = queryString.stringify(
    filters.reduce((map, filter) => {
      if (filter.type === 'match') {
        return { ...map, m: filter.subject };
      } else if (filter.type === 'includeIngredient') {
        return {
          ...map,
          in: (map.in || []).concat([filter.subject + ':' + filter.display]),
        };
      } else if (filter.type === 'excludeIngredient') {
        return {
          ...map,
          ex: (map.ex || []).concat([filter.subject + ':' + filter.display]),
        };
      }
    }, {}),
  );

  browserHistory.push({
    pathname: '/search',
    search,
  });
};

const readFromQuery = () => {
  const params = queryString.parse(window.location.search);

  let filters = [];
  if (params.m) {
    filters.push({
      id: uuid(),
      type: 'match',
      subject: params.m,
      display: params.m,
      __typename: 'SearchFilter',
    });
  }
  if (params.in) {
    filters = filters.concat(
      [].concat(params.in).map(f => {
        const [subject, display] = f.split(':');
        return {
          id: uuid(),
          type: 'includeIngredient',
          subject,
          display,
          __typename: 'SearchFilter',
        };
      }),
    );
  }
  if (params.ex) {
    filters = filters.concat(
      [].concat(params.ex).map(f => {
        const [subject, display] = f.split(':');
        return {
          id: uuid(),
          type: 'excludeIngredient',
          subject,
          display,
          __typename: 'SearchFilter',
        };
      }),
    );
  }
  return {
    searchFilters: filters,
    searchInputValue: '',
  };
};

export const defaults = readFromQuery();

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

      const searchFilters = previous.concat([newFilter]);

      const data = {
        searchFilters,
      };
      cache.writeQuery({ query, data });
      cache.writeData({
        data: { searchInputValue: '' },
      });
      writeToQuery(searchFilters);
      return newFilter;
    },

    removeSearchFilter: (_, { id }, { cache }) => {
      const previous = cache.readQuery({ query }).searchFilters;

      const removed = previous.find(f => f.id === id);

      const searchFilters = previous.filter(f => f.id !== id);

      const data = {
        searchFilters,
      };
      cache.writeQuery({ query, data });
      writeToQuery(searchFilters);
      return removed;
    },

    resetSearch: ({ cache }) => {
      cache.writeData({ data: initial });
      writeToQuery(initial);

      return null;
    },
  },
};
