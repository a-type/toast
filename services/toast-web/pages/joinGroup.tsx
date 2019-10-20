import React, { FC, useEffect, useState } from 'react';
import { IsLoggedIn } from 'components/auth/IsLoggedIn';
import Login from 'components/auth/Login';
import { Typography, Box, Container, Paper } from '@material-ui/core';
import GroupJoinButton from 'components/groups/GroupJoinButton';
import { parse } from 'querystring';

const JoinGroupPage = ({ token }: { token: string }) => {
  const [key, setKey] = useState(token);

  useEffect(() => {
    if (!key) {
      const storedKey = sessionStorage.getItem('toast_group_invite_key');
      if (storedKey) {
        setKey(storedKey);
      }
    } else {
      sessionStorage.setItem('toast_group_invite_key', key);
    }
  }, [key]);

  return (
    <Container>
      {key ? (
        <>
          <Typography paragraph>
            It's a food party, and your friends are already here. Let's get you
            started!
          </Typography>
          <Box mt={3}>
            <IsLoggedIn fallback={<Login />}>
              <GroupJoinButton invitationKey={key} />
            </IsLoggedIn>
          </Box>
        </>
      ) : (
        <Typography>
          Sorry, but the link you used seems broken. Ask whoever invited you to
          send you a new one.
        </Typography>
      )}
    </Container>
  );
};

JoinGroupPage.getInitialProps = ({ query }) => ({ token: query.key });

export default JoinGroupPage;
