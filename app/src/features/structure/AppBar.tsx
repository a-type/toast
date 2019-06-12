import React, { FC } from 'react';
import { BackdropArt, Logo } from 'components/brand';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Theme,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import Link from 'components/generic/Link';
import { SettingsTwoTone } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';

export interface ToastAppBarProps {
  gridArea: string;
}

const useStyles = makeStyles<Theme, ToastAppBarProps>((theme: Theme) => ({
  appBar: props => ({
    gridArea: props.gridArea,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer,
    display: 'flex',
    flexDirection: 'row',
  }),
  titleArea: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: '0 0 auto',
  },
  title: {
    fontFamily: '"Pacifico", "PlayFair Display", "PT Serif", serif',
    color: 'white',
  },
  settingsButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  logo: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: '32px',
    borderBottomRightRadius: '32px',
    borderBottomLeftRadius: 0,
    padding: '0 40px 0 32px',
    width: 'auto',
    fontSize: '24px',
  },
  toolbar: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}));

export const ToastAppBar: FC<ToastAppBarProps> = props => {
  const classes = useStyles(props);
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up('md'));

  if (isWide) {
    return null;
  }

  return (
    <AppBar className={classes.appBar}>
      <Link to="/" className={classes.titleArea}>
        <Logo className={classes.logo} size="48px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        <Link to="/settings">
          <IconButton aria-label="Settings" className={classes.settingsButton}>
            <SettingsTwoTone />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
