import React from 'react';
import styled from 'styled-components';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';
import Context from './layoutContext';
import { ContentArea } from './types';

const Layout = styled<{ wide?: boolean }, 'div'>('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  pointer-events: none;
  padding: var(--spacing-sm);

  & > * {
    pointer-events: initial;
  }

  & .${CLASS_NAMES.CONTENT} {
    margin: 0 auto;
    transition: 0.2s ease all;
    width: 100%;
    max-width: ${props => (props.wide ? 'auto' : '900px')};
    padding-top: var(--spacing-xl);
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    padding-bottom: var(--spacing-md);
  }

  & .${CLASS_NAMES.HERO_CONTENT} {
    margin-right: auto;
  }

  & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.HERO_CONTENT} {
    border-radius: var(--border-radius-md);
  }

  & .${CLASS_NAMES.HERO} {
    width: 100%;
    justify-content: flex-end;
    padding-top: var(--spacing-xl);
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    padding-bottom: var(--spacing-lg);
  }

  & .${CLASS_NAMES.CONTROLS} {
    margin-bottom: var(--spacing-sm);
  }

  @media (min-width: 900px) {
    & .${CLASS_NAMES.CONTENT} {
      padding-left: var(--spacing-xl);
      padding-right: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
    }

    & .${CLASS_NAMES.HERO} {
      padding-left: var(--spacing-xl);
      padding-right: var(--spacing-xl);
    }
  }

  @media (min-width: 1600px) {
    & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.HERO_CONTENT} {
      max-width: ${props => (props.wide ? 'auto' : '900px')};
    }

    & .${CLASS_NAMES.CONTENT} {
      width: 100%;
    }

    & .${CLASS_NAMES.HERO} {
      max-width: 1200px;

      margin-left: auto;
      margin-right: auto;
      padding-left: 150px;
      padding-right: 150px;
    }

    & .${CLASS_NAMES.HERO_CONTENT} {
      position: initial;
    }
  }
`;

export interface SingleColumnLayoutProps {
  wide?: boolean;
  className?: string;
  children: React.ReactNode;
}

// single column just uses a static context.
const context = {
  activeContents: new Set<ContentArea>(['main', 'secondary']),
  setActiveContent: () => {},
};

const SingleColumnLayout: React.SFC<SingleColumnLayoutProps> = ({
  children,
  wide,
  className,
  ...rest
}) => (
  <Context.Provider value={context}>
    <Layout
      wide={wide}
      className={classnames(className, CLASS_NAMES.LAYOUT)}
      {...rest}
    >
      {children}
    </Layout>
  </Context.Provider>
);

export default SingleColumnLayout;
