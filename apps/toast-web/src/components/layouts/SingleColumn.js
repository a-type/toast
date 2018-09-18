import React from 'react';
import styled from 'styled-components';
import { Tip, Background } from '../generic';
import { pathOr, path } from 'ramda';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';

const TOP_SPACE = '7vmax';

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
    margin-bottom: var(--spacing-lg);
    margin-left: var(--spacing-md);
    margin-right: auto;
  }

  & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.HERO_CONTENT} {
    border-radius: var(--border-radius-md);
  }

  & .${CLASS_NAMES.HERO} {
    width: 100%;
    height: 50vmax;
    margin-top: -${TOP_SPACE};
    justify-content: flex-end;
    padding-top: ${TOP_SPACE};
  }

  @media (min-width: 900px) {
    & .${CLASS_NAMES.CONTENT} {
      margin-left: var(--spacing-xl);
      margin-right: var(--spacing-xl);
      margin-bottom: var(--spacing-lg);
    }

    & .${CLASS_NAMES.HERO_CONTENT} {
      margin-left: var(--spacing-xl);
    }
  }

  @media (min-width: 1600px) {
    & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.HERO_CONTENT} {
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      max-width: ${props => (props.wide ? 'auto' : '900px')};
    }

    & .${CLASS_NAMES.HERO} {
      max-width: 1200px;
      height: 60vh;

      margin-left: auto;
      margin-right: auto;
    }

    & .${CLASS_NAMES.HERO_CONTENT} {
      position: initial;
      width: 900px;
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
