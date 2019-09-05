import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { IsLoggedIn } from 'components/auth/IsLoggedIn';
import Login from 'components/features/Login';
import { Center } from 'components/layout/Center';
import { Typography, Box, Container, Paper } from '@material-ui/core';
import GroupJoinButton from 'components/features/GroupJoinButton';
import { parse } from 'querystring';

export type JoinGroupPageProps = RouteComponentProps & {};

export const JoinGroupPage: FC<JoinGroupPageProps> = ({ match, location }) => {
  const query = parse(location.search.replace('?', ''));
  console.log(query);
  const [key, setKey] = useState(query.key as string);

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
      <Center title="Welcome!">
        {key ? (
          <>
            <Typography paragraph>
              It's a food party, and your friends are already here. Let's get
              you started!
            </Typography>
            <Box mt={3}>
              <IsLoggedIn fallback={<Login />}>
                <GroupJoinButton invitationKey={key} />
              </IsLoggedIn>
            </Box>
          </>
        ) : (
          <Typography>
            Sorry, but the link you used seems broken. Ask whoever invited you
            to send you a new one.
          </Typography>
        )}
      </Center>
    </Container>
  );
};
