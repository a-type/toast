import React, { FC, useEffect } from 'react';
import { ApolloError } from 'apollo-boost';
import { Box, Text, Button } from 'grommet';
import Icon, { GenericIconName } from './Icon';
import logger from 'logger';

export interface ErrorMessageProps {
  error?: ApolloError;
}

const getIcon = (error: ApolloError): GenericIconName => {
  switch (error.name) {
    case 'UserInputError':
    case 'ForbiddenError':
      return 'warn';
    default:
      return 'unavailable-cloud';
  }
};

const getText = (error: ApolloError): string => {
  if (!error) {
    return "Something went wrong on our end. That's our fault. Reloading might help.";
  }

  switch (error.name) {
    case 'UserInputError':
      return error.message;
    case 'ForbiddenError':
      return "Sorry, you're not able to do that.";
    default:
      return "Something went wrong on our end. That's our fault. Reloading might help.";
  }
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  useEffect(() => {
    logger.fatal(error);
  }, [error]);

  return (
    <Box direction="row">
      <Icon name={getIcon(error)} size="4em" />
      <Box flex="grow">
        <Text>{getText(error)}</Text>
        {!error ||
          (!['ForbiddenError', 'UserInputError'].includes(error.name) && (
            <Button
              margin={{ top: 'medium' }}
              onClick={() => window.location.reload()}
              label="Refresh"
            />
          ))}
      </Box>
    </Box>
  );
};

export default ErrorMessage;
