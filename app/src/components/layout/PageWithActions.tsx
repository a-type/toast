import React, { FC } from 'react';
import { SIDE_ACTIONS_MIN_WIDTH_PX } from 'constants/breakpoints';
import { Typography, IconButton } from '@material-ui/core';
import Icon from 'components/generic/Icon';
import Link from 'components/generic/Link';

export const CLASS_NAMES = {
  ACTIONS: 'actions',
  PAGE_CONTENT: 'page-content',
  BACK_BUTTON: 'back-button',
};

export interface PageWithActionsProps {
  pageTitle?: string;
  backPath?: string;
}

export const Actions: FC<{}> = ({ children }) => {
  return (
    <aside
      css={{
        gridArea: 'actions',
        padding: '0 var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '& > * + *': {
          marginTop: 'var(--spacing-lg)',
        },
        [`@media(min-width: ${SIDE_ACTIONS_MIN_WIDTH_PX}px)`]: {
          borderLeft: '1px solid var(--color-gray-lightest)',
        },
      }}
      className={CLASS_NAMES.ACTIONS}
    >
      <Typography
        variant="h2"
        css={{
          display: 'none',
          [`@media(min-width: ${SIDE_ACTIONS_MIN_WIDTH_PX}px)`]: {
            display: 'block',
          },
        }}
      >
        Links
      </Typography>
      {children}
    </aside>
  );
};

export const PageContent: FC<{}> = ({ children }) => {
  return (
    <main
      css={{
        gridArea: 'content',
        display: 'flex',
        flexDirection: 'column',
      }}
      className={CLASS_NAMES.PAGE_CONTENT}
    >
      {children}
    </main>
  );
};

export const PageWithActions: FC<PageWithActionsProps> = ({
  children,
  pageTitle,
  backPath,
}) => {
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateAreas: '"title" "actions" "content"',
        gridTemplateRows: 'auto auto 1fr',
        overflowY: 'auto',
        overflowX: 'hidden',
        [`& > .${CLASS_NAMES.ACTIONS}`]: {
          width: '100%',
          flex: 'auto',
        },
        [`& > .${CLASS_NAMES.PAGE_CONTENT}`]: {
          width: '100%',
          flex: '1',
        },
        [`@media(min-width: ${SIDE_ACTIONS_MIN_WIDTH_PX}px)`]: {
          gridTemplateAreas: '"title title" "content actions"',
          gridTemplateColumns: '1fr 320px',
          gridTemplateRows: 'auto 1fr',

          [`& > .${CLASS_NAMES.BACK_BUTTON}`]: {
            display: 'none',
          },
        },
      }}
    >
      {children}
    </div>
  );
};

export default PageWithActions;
