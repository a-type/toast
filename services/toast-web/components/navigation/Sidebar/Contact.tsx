import React, { FC, HTMLAttributes } from 'react';
import Link from '../../Link';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  box: {
    textAlign: 'center',
  },
  text: {
    maxWidth: '220px',
  },
});

export const SidebarContact: FC = props => {
  const classes = useStyles(props);

  return (
    <Box {...props} p={3} className={classes.box}>
      <Typography className={classes.text}>
        Made with love by Toast Cooking, © 2019
      </Typography>
      <Link to="mailto:support@toastcooking.app" newTab>
        <Button>Contact us</Button>
      </Link>
    </Box>
  );
};

export default SidebarContact;
