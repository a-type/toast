import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { CLASS_NAMES } from './constants';
import styled from 'styled-components';
import context from './layoutContext';
import { ContentArea } from './types';
import { cold } from 'react-hot-loader';

const BaseContentStyles = styled<{ scroll?: boolean }, 'div'>('div')`
  background: var(--color-content-background);
  color: var(--color-content-foreground);
  padding: 0;
  overflow-y: ${props => (props.scroll ? 'auto' : 'hidden')};
  overflow-y: ${props => (props.scroll ? 'overlay' : 'hidden')};

  @media (min-width: 900px) {
    padding: 0;
  }
`;

/**
 * A special Content style designed to overlay a primary-colored background
 */
const OverlayContentStyles = styled(BaseContentStyles)`
  --color-content-foreground: var(--color-dark);
  --color-content-background: var(--color-brand);
  --color-heading: var(--color-dark);
  --color-field-background: var(--color-brand-dark);
  --color-field-foreground: var(--color-white);
  --color-control-background: var(--color-brand-light);
  --color-control-foreground: var(--color-dark);

  background-blend-mode: overlay;

  backdrop-filter: blur(8px);
`;

export type ContentRenderFunc = (
  contentRenderProps: { setActiveContent(activeContent: ContentArea): void },
) => React.ReactNode;

export type ContentProps = {
  className?: string;
  mode?: 'default' | 'overlay';
  contentArea?: ContentArea;
  children: React.ReactNode | ContentRenderFunc;
  scroll?: boolean;
};

const renderFunctionGuard = (
  children: React.ReactNode | ContentRenderFunc,
): children is ContentRenderFunc => {
  return typeof children === 'function';
};

const Content = ({
  className,
  mode = 'default',
  contentArea = 'main',
  children,
  scroll,
  ...rest
}: ContentProps) => {
  const { activeContents, setActiveContent } = React.useContext(context);

  if (!activeContents.has(contentArea)) {
    return null;
  }

  const ContentStyles =
    mode === 'overlay' ? OverlayContentStyles : BaseContentStyles;

  const renderedChildren = renderFunctionGuard(children)
    ? children({ setActiveContent })
    : children;

  const targetElement = document.querySelector(
    `[data-content-portal-target=${contentArea}]`,
  );

  if (targetElement) {
    return ReactDOM.createPortal(
      <ContentStyles
        className={classnames(className, CLASS_NAMES.CONTENT)}
        data-grid-area={contentArea}
        scroll={scroll}
        {...rest}
      >
        {renderedChildren}
      </ContentStyles>,
      targetElement,
    );
  }

  return (
    <ContentStyles
      className={classnames(className, CLASS_NAMES.CONTENT)}
      data-grid-area={contentArea}
      scroll={scroll}
      {...rest}
    >
      {renderedChildren}
    </ContentStyles>
  );
};

export default cold(Content);
