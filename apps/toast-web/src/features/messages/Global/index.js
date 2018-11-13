import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import GlobalMessage from './Message';
import { Message } from 'components/generic';

const GetMessages = gql`
  query GetMessages {
    messages @client {
      id
      contents
    }
  }
`;

const GlobalMessages = () => (
  <Message.GlobalGroup>
    <Query query={GetMessages}>
      {({ data, loading, error }) => {
        if (!data.messages) {
          return null;
        }

        return data.messages.map(m => <GlobalMessage {...m} key={m.id} />);
      }}
    </Query>
  </Message.GlobalGroup>
);

export default GlobalMessages;
