import React, { SFC, HTMLAttributes, ReactNode, FC, ReactElement } from 'react';
import { CardShape, CardLayoutMode } from './types';
import useComponentSize from '@rehooks/component-size';
import styled from 'styled-components';
import { loading } from 'components/effects';
import CardWrapper from './components/CardWrapper';
import { CardContents } from './components/CardContents';
import { CardBadge } from './components/CardBadge';
import CardActionMenu from './components/CardActionMenu';
import { Heading, Box, Button, Paragraph } from 'grommet';
import Icon, { GenericIconName } from '../Icon';
import { BackdropArt } from 'components/brand';

type RenderProp = () => ReactElement;
export type CardAction =
  | RenderProp
  | {
      name: string;
      icon?: GenericIconName;
      onSelected(): any;
    };

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  children?: React.ReactNode;
  title?: string;
  shape?: CardShape;
  ref?: React.Ref<any>;
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
  renderBadge?: () => ReactNode;
  actions?: CardAction[];
}

export const useCardLayout = (): [any, CardLayoutMode] => {
  const ref = React.useRef(null);
  const { width, height } = useComponentSize(ref);
  let layout;
  if (width >= 250) {
    if (height >= 250) {
      layout = CardLayoutMode.Vertical;
    } else {
      layout = CardLayoutMode.Horizontal;
    }
  } else {
    layout = CardLayoutMode.Compact;
  }

  return [ref, layout];
};

const CardActionRow = styled(Box)`
  & > * + * {
    margin-left: var(--spacing-md);
  }

  & > .card-action-menu {
    margin-left: auto;
  }
`;

const CardActionButton: FC<{ action: CardAction }> = ({ action }) => {
  if (typeof action === 'function') {
    return action();
  }

  return (
    <Button
      label={action.name}
      icon={action.icon && <Icon name={action.icon} />}
      onClick={action.onSelected}
    />
  );
};

const stopPropagation = (ev: any) => {
  ev.stopPropagation();
};

export const Card: SFC<CardProps> = ({
  onClick,
  imageSrc,
  children,
  shape,
  renderBadge,
  actions = [],
  title,
  ...props
}) => {
  const [contentRef, layoutMode] = useCardLayout();

  const visibleActionCount =
    layoutMode === CardLayoutMode.Horizontal ||
    layoutMode === CardLayoutMode.Vertical
      ? 2
      : 1;

  const visibleActions = actions.slice(0, visibleActionCount);
  const invisibleActions = actions.slice(visibleActionCount);

  const showDetails = layoutMode === CardLayoutMode.Vertical || !imageSrc;

  return (
    <CardWrapper
      ref={contentRef}
      onClick={onClick}
      data-card-shape={shape}
      data-card-layout={layoutMode}
      imageSrc={imageSrc}
      {...props}
    >
      {!imageSrc && <BackdropArt />}
      {renderBadge && (
        <CardBadge className="card-badge">{renderBadge()}</CardBadge>
      )}
      <CardContents
        data-card-layout={layoutMode}
        data-shape={shape}
        className="card-contents"
      >
        {title && (
          <Heading
            level="4"
            className="card-title"
            margin={{ horizontal: 'medium', vertical: 'small' }}
            responsive={false}
          >
            {title}
          </Heading>
        )}
        {showDetails && (
          <Paragraph
            size="small"
            className="card-description"
            margin={{ horizontal: 'medium', top: '0' }}
          >
            {children}
          </Paragraph>
        )}
        {visibleActions.length !== 0 && (
          <CardActionRow
            direction="row"
            background="light-2"
            pad={{ vertical: 'small', horizontal: 'medium' }}
            className="neutral-content"
            align="center"
            onClick={stopPropagation}
          >
            {visibleActions.map((action, idx) => (
              <CardActionButton key={idx} action={action} />
            ))}
            {invisibleActions.length !== 0 && (
              <CardActionMenu margin={{ left: 'auto' }}>
                {invisibleActions.map((action, idx) => (
                  <CardActionButton key={idx} action={action} />
                ))}
              </CardActionMenu>
            )}
          </CardActionRow>
        )}
      </CardContents>
    </CardWrapper>
  );
};

export const CardGrid = styled<{ loading?: boolean }, 'div'>('div')`
  align-self: stretch;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(250px, 10vh);

  grid-gap: var(--spacing-md);
  grid-auto-flow: dense;
  margin-bottom: var(--spacing-lg);

  ${props => (props.loading ? loading : '')};

  @media (max-height: 600px) {
    grid-auto-rows: minmax(250px, 20vmax);
  }

  & > * {
    height: 100%;
  }

  & > *[data-card-shape='large'] {
    grid-column-end: span 2;
    grid-row-end: span 2;
  }

  & > *[data-card-shape='wide'] {
    grid-column-end: span 2;
  }
`;
