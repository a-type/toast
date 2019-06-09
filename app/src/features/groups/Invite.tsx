import * as React from 'react';
import Copy from 'react-copy-to-clipboard';
import { Box, Button, Typography, Dialog } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const CreateGroupInvitationMutation = gql`
  mutation CreateGroupInvitation {
    createGroupInvitation
  }
`;

export interface InviteProps {}

const Invite: React.SFC<InviteProps> = ({}) => {
  const [link, setLink] = React.useState<string>(null);
  const [copied, setCopied] = React.useState<boolean>(null);
  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
        setLink(null);
      }, 3000);
    }
  }, [copied]);
  const mutate = useMutation(CreateGroupInvitationMutation);
  const createAndSend = async () => {
    const result = await mutate();
    if (!result) {
      // TODO: failure case
      return <div>Error</div>;
    }
    const link =
      window.location.origin +
      '/joinGroup?key=' +
      result.data.createGroupInvitation;
    if (window.navigator['share']) {
      window.navigator['share']({
        title: 'Join my meal planning group',
        text: "Join my meal planning group in Toast - let's make some food!",
        url: link,
      });
    } else {
      setLink(link);
    }
  };

  return (
    <>
      <Button onClick={createAndSend}>Invite someone to your plan</Button>
      <Dialog open={!!link} onClose={() => setLink(null)}>
        <Box flexDirection="column" alignItems="center" p={2}>
          <Copy text={link} onCopy={() => setCopied(true)}>
            <Button color="primary">
              {copied ? 'Copied' : 'Copy invite link'}
            </Button>
          </Copy>
          <Typography variant="body2">
            This link will only work once, and expires in a day. Be sure to send
            it to the right person.
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default Invite;
