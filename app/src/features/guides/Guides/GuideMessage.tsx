import React, { FC, useState } from 'react';
import { Guide } from '../types';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Link, { LinkProps } from 'components/generic/Link';
import { Box, IconButton, Typography, Collapse } from '@material-ui/core';
import Icon from 'components/generic/Icon';

const MessageBox = styled(Box)`
  border-left: 1px solid var(--color-primary-dark);
  background: var(--color-primary);
  color: var(--color-dark);
  position: relative;

  &::before {
    content: 'Tip';
    position: absolute;
    bottom: 100%;
    left: -1px;
    background: var(--color-primary);
    color: var(--color-dark);
    font-style: italic;
    border-top-right-radius: var(--border-radius-md);
    padding: var(--spacing-xs) var(--spacing-lg);
    border-left: 1px solid var(--color-primary-dark);
  }

  & > *:first-child {
    flex: 1;
  }
`;

const ActionLink = styled<{ primary?: boolean } & LinkProps>(
  ({ primary, ...rest }) => <Link {...rest} />,
)`
  background: ${props =>
    props.primary ? 'var(--color-secondary)' : 'var(--color-white)'};
  color: ${props =>
    props.primary ? 'var(--color-white)' : 'var(--color-secondary)'};
  border-top: 1px solid var(--color-secondary);
  text-align: center;
  font-style: italic;
  display: flex;
  padding: var(--spacing-md);

  & > * {
    margin: auto;
  }
`;

interface GuideMessageProps {
  guide: Guide;
  dismiss(): void;
}

export const GuideMessage: FC<GuideMessageProps & RouteComponentProps> = ({
  guide,
  dismiss,
  location,
}) => {
  const [expanded, setExpanded] = useState(false);

  const path = location.pathname;
  const isOnPage = guide.page === path;
  const content = isOnPage ? (
    <Box p={1} flexGrow={1}>
      <Box flexDirection="row">
        <IconButton
          css={{ padding: 0, marginRight: '16px', marginLeft: '8px' }}
          onClick={() => setExpanded(!expanded)}
        >
          <Icon name="expand_more" rotation={expanded ? 0 : 180} />
        </IconButton>
        <Typography>{guide.summary}</Typography>
      </Box>
      <Collapse in={expanded}>
        <Box p={2}>
          <Typography>{guide.text}</Typography>
        </Box>
      </Collapse>
    </Box>
  ) : (
    <ActionLink to={guide.page} primary>
      <span>
        {guide.action} <Icon name="expand_more" rotation={270} />
      </span>
    </ActionLink>
  );

  return (
    <MessageBox flexDirection="row" alignItems="stretch">
      {content}
      <ActionLink onClick={dismiss} primary={isOnPage}>
        <Icon name="done" />
      </ActionLink>
    </MessageBox>
  );
};

export default withRouter(GuideMessage);
