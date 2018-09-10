import React from 'react';
import styled from 'styled-components';
import { Tip, Background } from '../generic';
import { pathOr, path } from 'ramda';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';

const Layout = styled.div`
  width: 100%;
  max-width: ${props => (props.wide ? 'auto' : '900px')};
  display: flex;
  flex-direction: column;
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
  position: relative;
  z-index: 1;
  pointer-events: none;
  top: ${props => (props.hasHeaderImage ? '20vh' : 'var(--spacing-xl)')};

  & > * {
    pointer-events: initial;
  }

  & > .${CLASS_NAMES.CONTENT} {
    margin: 0;
    transition: 0.2s ease all;
    border-radius: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }

  @media (min-width: 900px) {
    & > .${CLASS_NAMES.CONTENT} {
      margin-left: var(--spacing-xl);
      margin-right: var(--spacing-xl);
      margin-bottom: var(--spacing-lg);
    }
  }

  @media (min-width: 1600px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeaderImage = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 0;
  height: 40vh;
  background-color: var(--color-gray-lightest);
  background-image: url(${props => props.src});
  background-size: cover;
`;

const ImageAttributionIcon = styled.div`
  position: absolute;
  bottom: var(--spacing-xl);
  right: var(--spacing-xs);
  color: white;
  opacity: 0.5;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 720px) {
    bottom: var(--spacing-xs);
    right: var(--spacing-lg);
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
