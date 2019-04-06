import React, { FC, HTMLAttributes } from 'react';
import { Box, Button, BoxProps } from 'grommet';
import { HelpText } from 'components/text';
import { Link } from 'components/generic';

export const SidebarContact: FC<HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <Box
      {...props}
      pad="medium"
      style={{
        textAlign: 'center',
        borderTop: '2px solid var(--color-shadow)',
      }}
    >
      <Link to="mailto:support@toastcooking.app">
        <Button label="Contact us" />
      </Link>
      <HelpText margin={{ top: 'small' }}>
        Made with love by Toast Cooking, © 2019
      </HelpText>
    </Box>
  );
};

export default SidebarContact;
