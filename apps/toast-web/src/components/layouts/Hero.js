import React from 'react';
import styled from 'styled-components';
import { Tip } from '../generic';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';
import { path, pathOr } from 'ramda';

const HeaderImage = styled.div`
  left: 0;
  top: 0;
  right: 0;
  z-index: 0;
  background-color: var(--color-gray-lightest);
  background-image: url(${props => props.src});
  background-size: cover;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageAttributionIcon = styled.div`
  position: absolute;
  bottom: var(--spacing-xs);
  right: var(--spacing-xs);
  color: white;
  opacity: 0.5;

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  background: var(--color-white);
  color: var(--color-dark);
  padding: var(--spacing-lg);
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

export default ({
  image,
  loading,
  className,
  contentClassName,
  children,
  ...rest
}) => {
  if (!image && !loading) {
    return null;
  }

  return (
    <HeaderImage
      className={classnames(CLASS_NAMES.HERO, className)}
      src={pathOr(null, ['url'], image)}
      loading={loading}
      {...rest}
    >
      {path(['attribution'], image) && (
        <ImageAttribution attribution={path(['attribution'], image)} />
      )}
      {children && (
        <Content
          className={classnames(CLASS_NAMES.HERO_CONTENT, contentClassName)}
        >
          {children}
        </Content>
      )}
    </HeaderImage>
  );
};
