import React, { FC, useEffect, useState } from 'react';
import { ApolloError } from 'apollo-boost';
import Icon, { GenericIconName } from './Icon';
import logger from 'logger';
import { differenceInMinutes } from 'date-fns';
import Link from './Link';
import {
  Paper,
  Box,
  Typography,
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { WarningTwoTone, CloudOffTwoTone } from '@material-ui/icons';

const LAST_ERROR_REFRESH_KEY = 'lastErrorRefresh';
const UNKNOWN_MESSAGE =
  'Something went wrong on our end. Reloading might help.';
const REPEAT_MESSAGE =
  "Looks like reloading didn't solve the problem. This might be a temporary issue, but feel free to contact us if it persists.";

export interface ErrorMessageProps {
  error?: ApolloError | string;
  full?: boolean;
  onClose?: () => any;
}

const useStyles = makeStyles<Theme>(theme => ({
  icon: {
    fontSize: '4rem',
    color: theme.palette.error.dark,
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.light,
    padding: theme.spacing(3),
  },
  button: {
    color: theme.palette.error.contrastText,
    borderColor: theme.palette.error.contrastText,
    '&:hover': {
      color: theme.palette.error.contrastText,
      borderColor: theme.palette.error.contrastText,
    },
    '&:focus': {
      color: theme.palette.error.contrastText,
      borderColor: theme.palette.error.contrastText,
    },
    margin: theme.spacing(1),
  },
}));

const isWarning = (error: ApolloError | string): boolean => {
  if (typeof error === 'string') {
    return true;
  }

  switch (error.name) {
    case 'UserInputError':
    case 'ForbiddenError':
      return true;
    default:
      return false;
  }
};

const getText = (
  error: ApolloError | string,
  isRepeatError: boolean,
): string => {
  if (!error) {
    if (isRepeatError) {
      return REPEAT_MESSAGE;
    }
    return UNKNOWN_MESSAGE;
  }

  if (typeof error === 'string') {
    return error;
  }

  switch (error.name) {
    case 'UserInputError':
      return error.message;
    case 'ForbiddenError':
      return "Sorry, you're not able to do that.";
    default:
      if (isRepeatError) {
        return REPEAT_MESSAGE;
      }
      return UNKNOWN_MESSAGE;
  }
};

export const ErrorMessage: FC<ErrorMessageProps> = props => {
  const { error, full, onClose } = props;
  const classes = useStyles(props);

  const [isDismissed, setDismissed] = useState(false);

  useEffect(() => {
    logger.fatal(error);
    setDismissed(false);
  }, [error]);

  const lastErrorRefreshTime = sessionStorage.getItem(LAST_ERROR_REFRESH_KEY);

  const saveLastErrorRefreshTime = () => {
    sessionStorage.setItem(LAST_ERROR_REFRESH_KEY, new Date().toISOString());
  };

  const isRepeatError =
    lastErrorRefreshTime &&
    Math.abs(differenceInMinutes(lastErrorRefreshTime, new Date())) < 2;

  if (isDismissed) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      {isWarning(error) ? (
        <WarningTwoTone className={classes.icon} />
      ) : (
        <CloudOffTwoTone className={classes.icon} />
      )}
      <Box ml={2} alignContent="flex-start">
        <Typography variant="body1" gutterBottom>
          {getText(error, isRepeatError)}
        </Typography>
        <Box flexDirection="row" justifyContent="flex-start">
          {!error ||
            (typeof error !== 'string' &&
            !['ForbiddenError', 'UserInputError'].includes(error.name) ? (
              <Button
                className={classes.button}
                onClick={() => {
                  saveLastErrorRefreshTime();
                  window.location.reload();
                }}
              >
                Reload
              </Button>
            ) : (
              <Button onClick={() => setDismissed(true)}>Dismiss</Button>
            ))}
          {isRepeatError && (
            <Link to="mailto:support@toastcooking.app">
              <Button className={classes.button}>Contact support</Button>
            </Link>
          )}
          {onClose && (
            <Button variant="text" onClick={onClose} className={classes.button}>
              Close
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ErrorMessage;
