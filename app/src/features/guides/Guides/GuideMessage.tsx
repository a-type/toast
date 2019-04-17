import React, { FC, useState } from 'react';
import { Guide } from '../types';
import { Text, Box, Button, Collapsible } from 'grommet';
import { Icon, Link } from 'components/generic';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { LinkProps } from 'components/generic/Link';

const MessageBox = styled(Box)`
  border-left: 1px solid var(--color-brand-dark);
  background: var(--color-brand);
  color: var(--color-dark);
  position: relative;

  &::before {
    content: 'Tip';
    position: absolute;
    bottom: 100%;
    left: -1px;
    background: var(--color-brand);
    color: var(--color-dark);
    font-style: italic;
    border-top-right-radius: var(--border-radius-md);
    padding: var(--spacing-xs) var(--spacing-lg);
    border-left: 1px solid var(--color-brand-dark);
  }

  & > *:first-child {
    flex: 1;
  }
`;

const ActionLink = styled<{ primary?: boolean } & LinkProps>(
  ({ primary, ...rest }) => <Link {...rest} />,
)`
  background: ${props =>
    props.primary ? 'var(--color-positive)' : 'var(--color-white)'};
  color: ${props =>
    props.primary ? 'var(--color-white)' : 'var(--color-positive)'};
  border-top: 1px solid var(--color-positive);
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
    <Box pad="small" flex="grow">
      <Box direction="row">
        <Button
          style={{ padding: 0 }}
          margin={{ right: 'medium', left: 'small' }}
          onClick={() => setExpanded(!expanded)}
          icon={<Icon name="expand_more" rotation={expanded ? 0 : 180} />}
        />
        <Text>{guide.summary}</Text>
      </Box>
      <Collapsible open={expanded}>
        <Box pad="medium">
          <Text size="small">{guide.text}</Text>
        </Box>
      </Collapsible>
    </Box>
  ) : (
    <ActionLink to={guide.page} primary>
      <span>
        {guide.action} <Icon name="expand_more" rotation={270} />
      </span>
    </ActionLink>
  );

  return (
    <MessageBox direction="row" align="stretch">
      {content}
      <ActionLink onClick={dismiss} primary={isOnPage}>
        <Icon name="done" />
      </ActionLink>
    </MessageBox>
  );
};

export default withRouter(GuideMessage);
