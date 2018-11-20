import React from 'react';
import styled from 'styled-components';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';
import { gridAreas } from 'components/effects';

const Layout = styled<{}, 'div'>('div')`
  width: 100%;
  display: grid;
  grid-template-areas: 'banner' 'secondary' 'main';
  grid-template-rows: auto auto auto;
  position: relative;
  z-index: 1;

  & .${CLASS_NAMES.CONTENT} {
    margin: 0 auto;
    transition: 0.2s ease all;
    width: 100%;
    padding-top: var(--spacing-xl);
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-radius: var(--border-radius-md);
  }

  & .${CLASS_NAMES.BANNER} {
    grid-area: banner;
    width: 100%;
  }

  @media(min-width: 768px) {
    grid-template-areas: 'banner banner' 'secondary main';
    grid-template-columns: 1fr 2fr;
  }

  @media(min-width: 900px) {
    & .${CLASS_NAMES.CONTENT} {
      padding-left: var(--spacing-xl);
      padding-right: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
    }
  }

  @media(min-width: 1600px) {
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }

  ${gridAreas(['banner', 'secondary', 'main'])}
`;

export interface TwoColumnLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const TwoColumnLayout: React.SFC<TwoColumnLayoutProps> = ({ children, className, ...rest }) => (
  <Layout
    className={classnames(className, CLASS_NAMES.LAYOUT)}
    {...rest}
  >
    {children}
  </Layout>
)

export default TwoColumnLayout;
