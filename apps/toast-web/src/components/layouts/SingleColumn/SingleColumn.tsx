import React from 'react';
import styled from 'styled-components';
import { CLASS_NAMES } from '../constants';
import classnames from 'classnames';
import Context from '../layoutContext';
import { ContentArea } from '../types';
import BaseLayout, { BaseLayoutProps } from '../components/BaseLayout';

const Layout = styled(BaseLayout)`
  grid-template-areas: 'navigation' 'banner' 'content' 'controls';
  grid-template-rows: auto auto 1fr auto;

  & .${CLASS_NAMES.CONTENT} {
    margin: 0 auto;
    transition: 0.2s ease all;
    padding-top: var(--spacing-xl);
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    padding-bottom: var(--spacing-md);
  }

  & .${CLASS_NAMES.CONTENT} {
    border-radius: var(--border-radius-md);
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
  }

  @media (min-width: 1600px) {
    & .${CLASS_NAMES.CONTENT} {
      max-width: 900px;
    }

    & .${CLASS_NAMES.CONTENT} {
      width: 100%;
    }
  }
`;

export interface SingleColumnLayoutProps extends BaseLayoutProps {
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
  className,
  ...rest
}) => (
  <Context.Provider value={context}>
    <Layout className={classnames(className, CLASS_NAMES.LAYOUT)} {...rest}>
      {children}
    </Layout>
  </Context.Provider>
);

export default SingleColumnLayout;
