import * as React from 'react';
import Copy from 'react-copy-to-clipboard';
import { Box, Button, Typography, Dialog } from '@material-ui/core';
import { useCreateGroupInvite } from 'hooks/features/useCreateGroupInvite';
import ErrorMessage from 'components/generic/ErrorMessage';
import { ButtonProps } from '@material-ui/core/Button';

export interface GroupInviteButtonProps extends ButtonProps {}

export const GroupInviteButton: React.SFC<GroupInviteButtonProps> = props => {
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
  const [error, setError] = React.useState(null);
  const [mutate] = useCreateGroupInvite();
  const createAndSend = async () => {
    try {
      const result = await mutate();
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
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Button onClick={createAndSend} {...props}>
        Invite someone to your plan
      </Button>
      {error && <ErrorMessage error={error} />}
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
