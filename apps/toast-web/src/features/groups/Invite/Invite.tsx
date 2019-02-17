import * as React from 'react';
import CreateGroupInvitationMutation from './CreateGroupInvitationMutation';
import Copy from 'react-copy-to-clipboard';
import { HelpText } from 'components/text';
import { Button, Box, DropButton } from 'grommet';

export interface InviteProps {}

const Invite: React.SFC<InviteProps> = ({}) => {
  const [link, setLink] = React.useState<string>(null);
  const [copied, setCopied] = React.useState<boolean>(null);
  React.useEffect(
    () => {
      if (copied) {
        setTimeout(() => {
          setCopied(false);
          setLink(null);
        }, 3000);
      }
    },
    [copied],
  );

  return (
    <CreateGroupInvitationMutation>
      {mutate => {
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
              text:
                "Join my meal planning group in Toast - let's make some food!",
              url: link,
            });
          } else {
            setLink(link);
          }
        };

        const content = link ? (
          <Box direction="column" align="center" pad="medium">
            <Copy text={link} onCopy={() => setCopied(true)}>
              <Button primary label={copied ? 'Copied' : 'Copy invite link'} />
            </Copy>
            <HelpText style={{ maxWidth: '200px' }}>
              This link will only work once, and expires in a day. Be sure to
              send it to the right person.
            </HelpText>
          </Box>
        ) : (
          <Box pad="medium">Loading...</Box>
        );

        return (
          <DropButton
            onClick={createAndSend}
            label="Invite someone to your plan"
            open={!!link}
            onClose={() => setLink(null)}
            dropContent={content}
          />
        );
      }}
    </CreateGroupInvitationMutation>
  );
};

export default Invite;
