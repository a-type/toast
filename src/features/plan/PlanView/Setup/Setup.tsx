import React, { useState } from 'react';
import { Heading, Paragraph, Button } from 'grommet';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

export const Document = gql`
  mutation CreatePlan {
    createGroup {
      id
    }
  }
`;

export default ({ onCreated }: { onCreated: () => any }) => {
  const [showJoinInfo, setShowJoinInfo] = useState(false);
  const mutate = useMutation(Document);

  const create = async () => {
    await mutate();
    onCreated();
  };

  return (
    <React.Fragment>
      <Heading>Let's get started</Heading>
      <Paragraph>
        Thanks for joining Toast! Let's set you up with your new plan. This
        shouldn't take long.
      </Paragraph>
      <Paragraph>
        First off, are you looking to start your own plan, or join someone else?
      </Paragraph>
      {!showJoinInfo ? (
        <>
          <Button
            primary
            label="Create my own plan"
            onClick={create}
            margin={{ bottom: 'medium' }}
          />
          <Button
            label="Join someone else's plan"
            onClick={() => setShowJoinInfo(true)}
          />
        </>
      ) : (
        <>
          <Paragraph margin={{ bottom: 'medium' }}>
            To join someone else's plan, you need to ask them to create a magic
            link for you. Ask them to click the button in the menu and send the
            link it generates to you.
          </Paragraph>
          <Button
            label="Nevermind, I'll make my own plan"
            onClick={() => setShowJoinInfo(false)}
          />
        </>
      )}
    </React.Fragment>
  );
};
