import React, { FC } from 'react';
import { BackdropArt } from 'components/brand';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Theme,
  makeStyles,
} from '@material-ui/core';
import Link from 'components/generic/Link';
import { SettingsTwoTone } from '@material-ui/icons';

export interface ToastAppBarProps {
  gridArea: string;
}

const useStyles = makeStyles<Theme, ToastAppBarProps>(theme => ({
  appBar: props => ({
    gridArea: props.gridArea,
    position: 'relative',
    backgroundColor: 'transparent',
  }),
  title: {
    fontFamily: '"Pacifico", "PlayFair Display", "PT Serif", serif',
    color: 'white',
    flexGrow: 1,
  },
  settingsButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const ToastAppBar: FC<ToastAppBarProps> = props => {
  const classes = useStyles(props);

  return (
    <AppBar className={classes.appBar}>
      <BackdropArt />
      <Toolbar>
        <Typography variant="h3" className={classes.title}>
          Toast
        </Typography>
        <Link to="/settings">
          <IconButton aria-label="Settings" className={classes.settingsButton}>
            <SettingsTwoTone />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
