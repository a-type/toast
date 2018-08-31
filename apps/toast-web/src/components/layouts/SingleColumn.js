import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  margin: 0;
  background: var(--color-white);
  transition: 0.2s ease all;
  border-radius: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);

  @media (min-width: 900px) {
    margin-left: var(--spacing-xl);
    margin-right: var(--spacing-xl);
  }
`;

const Layout = styled.div`
  width: 100%;
  max-width: ${props => (props.wide ? 'auto' : '900px')};
  display: flex;
  flex-direction: column;
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);

  & > ${Content}:first-child {
    margin-top: ${props =>
      props.hasHeaderImage ? '20vh' : 'var(--spacing-xl)'};
  }

  & > ${Content} {
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
  z-index: -1;
  height: 40vh;
  background: url(${props => props.src});
  background-size: cover;
`;

const SingleColumnLayout = ({ headerImageSrc, children, wide }) => (
  <Layout hasHeaderImage={!!headerImageSrc} wide={wide}>
    {children}
    {headerImageSrc && <HeaderImage src={headerImageSrc} />}
  </Layout>
);

SingleColumnLayout.Content = Content;

export default SingleColumnLayout;