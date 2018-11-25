// TODO: refactor this to some place that makes sense
import client from './apolloClient';
import gql from 'graphql-tag';

const ShowMessage = gql`
  mutation ShowMessage($contents: [String]!) {
    showMessage(contents: $contents) @client {
      id
      contents
    }
  }
`;

export const show = contents =>
  client.mutate({
    mutation: ShowMessage,
    variables: {
      contents: typeof contents === 'string' ? [contents] : contents,
    },
  });
