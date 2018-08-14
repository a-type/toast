import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  margin: var(--spacing-sm);
  margin-top: 0;

  @media (min-width: 900px) {
    margin: var(--spacing-lg);
    margin-top: 0;
  }
`;

const Layout = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;

  & > ${Content}:first-child {
    margin-top: ${props =>
      props.hasHeaderImage ? '20vh' : 'var(--spacing-lg)'};
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
`;

const SingleColumnLayout = ({ headerImageSrc, children }) => (
  <Layout hasHeaderImage={!!headerImageSrc}>
    {headerImageSrc && <HeaderImage src={headerImageSrc} />}
    {children}
  </Layout>
);

SingleColumnLayout.Content = Content;

export default SingleColumnLayout;
