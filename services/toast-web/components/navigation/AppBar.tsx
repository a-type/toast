import React, { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Theme,
  makeStyles,
  useMediaQuery,
  Button,
  Hidden,
} from '@material-ui/core';
import Link from '../Link';
import { SettingsTwoTone, PersonTwoTone } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { IsLoggedIn } from '../auth/IsLoggedIn';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../brand/Logo';

export interface ToastAppBarProps {}

const useStyles = makeStyles<Theme, ToastAppBarProps>((theme: Theme) => ({
  appBar: props => ({
    position: 'relative',
    backgroundColor: theme.palette.primary[500],
    zIndex: theme.zIndex.drawer,
    display: 'flex',
    flexDirection: 'row',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.primary[900]}`,
  }),
  titleArea: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: '0 0 auto',
    marginLeft: theme.spacing(3),
  },
  title: {
    fontFamily: '"Pacifico", "PlayFair Display", "PT Serif", serif',
    color: 'white',
  },
  settingsButton: {},
  logo: {
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
  const { user } = useAuth();

  return (
    <Hidden mdUp implementation="css">
      <AppBar className={classes.appBar}>
        <Link to="/" className={classes.titleArea}>
          <Logo className={classes.logo} variant="small" size="42px" />
        </Link>

        <Toolbar className={classes.toolbar}>
          <IsLoggedIn
            fallback={
              <Button component={Link} to="/login">
                Log in
              </Button>
            }
          >
            {user && (
              <IconButton
                aria-label="Profile"
                component={Link}
                to={`/users/${user.uid}`}
              >
                <PersonTwoTone />
              </IconButton>
            )}
            <IconButton
              aria-label="Settings"
              className={classes.settingsButton}
              component={Link}
              to="/settings"
            >
              <SettingsTwoTone />
            </IconButton>
          </IsLoggedIn>
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};
