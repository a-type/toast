import React from 'react';
import styled from 'styled-components';
import { Tip, Background } from '../generic';
import { pathOr, path } from 'ramda';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';

const TOP_SPACE = '200px';

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  pointer-events: none;
  margin-top: ${TOP_SPACE};

  & > * {
    pointer-events: initial;
  }

  & .${CLASS_NAMES.CONTENT} {
    margin: 0;
    transition: 0.2s ease all;
    max-width: ${props => (props.wide ? 'auto' : '900px')};
    margin-top: var(--spacing-xl);
    margin-left: var(--spacing-md);
    margin-right: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  & .${CLASS_NAMES.HERO_CONTENT} {
    margin-right: auto;
  }

  & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.HERO_CONTENT} {
    border-radius: var(--border-radius-md);
  }

  & .${CLASS_NAMES.HERO} {
    width: 100%;
    margin-top: -${TOP_SPACE};
    justify-content: flex-end;
    padding-top: ${TOP_SPACE};
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    padding-bottom: var(--spacing-lg);
  }

  @media (min-width: 900px) {
    & .${CLASS_NAMES.CONTENT} {
      margin-left: var(--spacing-xl);
      margin-right: var(--spacing-xl);
      margin-bottom: var(--spacing-lg);
    }

    & .${CLASS_NAMES.HERO} {
      padding-left: var(--spacing-xl);
      padding-right: var(--spacing-xl);
    }
  }

  @media (min-width: 1600px) {
    & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.HERO_CONTENT} {
      margin-right: auto;
      max-width: ${props => (props.wide ? 'auto' : '900px')};
    }

    & .${CLASS_NAMES.CONTENT} {
      width: 100%;
      margin-left: auto;
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

const SingleColumnLayout = ({
  headerImage,
  children,
  wide,
  loading,
  className,
  ...rest
}) => (
  <Background.Consumer>
    {({ hasBackground }) => (
      <Layout
        hasHeaderImage={!!hasBackground}
        wide={wide}
        className={classnames(className, CLASS_NAMES.LAYOUT)}
        {...rest}
      >
        {children}
      </Layout>
    )}
  </Background.Consumer>
);

export default SingleColumnLayout;
