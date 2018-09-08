import React from 'react';
import styled from 'styled-components';
import { Tip, Background } from '../generic';
import { pathOr, path } from 'ramda';

const Content = styled.div`
  margin: 0;
  background: var(--color-white);
  transition: 0.2s ease all;
  border-radius: var(--spacing-sm);
  margin-bottom: var(--spacing-md);

  @media (min-width: 900px) {
    margin-left: var(--spacing-xl);
    margin-right: var(--spacing-xl);
    margin-bottom: var(--spacing-lg);
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

  & > ${Content} {
    pointer-events: initial;
    padding: ${props => (props.hasHeaderImage ? 'var(--spacing-md)' : '0')};
  }

  @media (min-width: 900px) {
    & > ${Content} {
      padding: ${props => (props.hasHeaderImage ? 'var(--spacing-xl)' : '0')};
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

const ImageAttribution = ({ attribution }) => (
  <Tip.Toggle placement="left" tipContent={`Image © ${attribution}`}>
    {({ ref, onClick }) => (
      <ImageAttributionIcon innerRef={ref} onClick={onClick}>
        ©
      </ImageAttributionIcon>
    )}
  </Tip.Toggle>
);

const SingleColumnLayout = ({
  headerImage,
  children,
  wide,
  loading,
  ...rest
}) => (
  <Layout
    hasHeaderImage={!!headerImage || loading}
    wide={wide}
    loading={loading}
    {...rest}
  >
    {children}
    {(headerImage || loading) && (
      <Background>
        <HeaderImage src={pathOr(null, ['url'], headerImage)} loading={loading}>
          {path(['attribution'], headerImage) && (
            <ImageAttribution attribution={headerImage.attribution} />
          )}
        </HeaderImage>
      </Background>
    )}
  </Layout>
);

SingleColumnLayout.Content = Content;

export default SingleColumnLayout;
