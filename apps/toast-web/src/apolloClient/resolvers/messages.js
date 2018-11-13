import uuid from 'uuid';
import gql from 'graphql-tag';

export const defaults = {
  messages: [],
};

const query = gql`
  query InternalGetMessages {
    messages @client {
      id
      contents
    }
  }
`;

export default {
  Mutation: {
    showMessage: (_, { contents }, { cache }) => {
      const previous = cache.readQuery({ query }).messages;

      const newMessage = {
        contents,
        id: uuid(),
        __typename: 'Message',
      };

      const messages = previous.concat([newMessage]);

      const data = {
        messages,
      };

      cache.writeQuery({ query, data });

      return newMessage;
    },

    dismissMessage: (_, { id }, { cache }) => {
      const previous = cache.readQuery({ query }).messages;

      const removed = previous.find(m => m.id === id);
      const messages = previous.filter(m => m.id !== id);

      const data = {
        messages,
      };

      cache.writeQuery({ query, data });

      return removed;
    },
  },
};
