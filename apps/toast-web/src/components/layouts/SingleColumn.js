import React from 'react';
import styled from 'styled-components';
import { Tip, Background } from '../generic';
import { pathOr, path } from 'ramda';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';

const Banner = styled.div`
  background: var(--color-brand);
  color: var(--color-white);
  padding: var(--spacing-md);

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 720px) {
    padding: var(--spacing-lg);
  }

  @media (min-width: 900px) {
    padding: var(--spacing-xl);
  }
`;

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

  & > ${CLASS_NAMES.CONTENT} {
    pointer-events: initial;
    padding: ${props => (props.hasHeaderImage ? 'var(--spacing-md)' : '0')};
    margin: 0;
    background: var(--color-white);
    transition: 0.2s ease all;
    border-radius: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }

  @media (min-width: 900px) {
    & > ${CLASS_NAMES.CONTENT} {
      padding: ${props => (props.hasHeaderImage ? 'var(--spacing-xl)' : '0')};
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
