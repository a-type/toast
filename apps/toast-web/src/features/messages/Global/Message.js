import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'fraql';
import { Message } from 'components/generic';

const DismissMessage = gql`
  mutation DismissMessage($id: ID!) {
    dismissMessage(id: $id) @client
  }
`;

const GlobalMessage = ({ contents, id }) => (
  <Mutation mutation={DismissMessage} variables={{ id }}>
    {dismiss => <Message onDismiss={dismiss}>{contents}</Message>}
  </Mutation>
);

export default GlobalMessage;
