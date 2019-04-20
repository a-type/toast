import React, { FC, useEffect, useState } from 'react';
import { ApolloError } from 'apollo-boost';
import { Box, Text, Button, Paragraph } from 'grommet';
import Icon, { GenericIconName } from './Icon';
import logger from 'logger';
import { differenceInMinutes } from 'date-fns';
import Link from './Link';

const LAST_ERROR_REFRESH_KEY = 'lastErrorRefresh';
const UNKNOWN_MESSAGE =
  'Something went wrong on our end. Reloading might help.';
const REPEAT_MESSAGE =
  "Looks like reloading didn't solve the problem. This might be a temporary issue, but feel free to contact us if it persists.";

export interface ErrorMessageProps {
  error?: ApolloError;
  full?: boolean;
}

const getIcon = (error: ApolloError): GenericIconName => {
  switch (error.name) {
    case 'UserInputError':
    case 'ForbiddenError':
      return 'warning';
    default:
      return 'cloud_off';
  }
};

const getText = (error: ApolloError, isRepeatError: boolean): string => {
  if (!error) {
    if (isRepeatError) {
      return REPEAT_MESSAGE;
    }
    return UNKNOWN_MESSAGE;
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

export const ErrorMessage: FC<ErrorMessageProps> = ({ error, full }) => {
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
    <Box
      direction="row"
      pad="small"
      align="center"
      width={full ? '100%' : 'auto'}
      height={full ? '100%' : 'auto'}
      background="light-2"
      className="neutral-content"
      justify="center"
      margin={full ? '0' : 'small'}
      round={!full}
    >
      <Icon name={getIcon(error)} size="4em" color="var(--color-gray)" />
      <Box margin={{ left: 'medium' }} align="start">
        <Paragraph>{getText(error, isRepeatError)}</Paragraph>
        <Box direction="row" justify="start">
          {!error ||
            (!['ForbiddenError', 'UserInputError'].includes(error.name) ? (
              <Button
                onClick={() => {
                  saveLastErrorRefreshTime();
                  window.location.reload();
                }}
                margin={{ right: 'small', left: '0' }}
                label="Reload"
              />
            ) : (
              <Button label="Dismiss" onClick={() => setDismissed(true)} />
            ))}
          {isRepeatError && (
            <Link to="mailto:support@toastcooking.app">
              <Button label="Contact support" />
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorMessage;
