import React from 'react';
import styled from 'styled-components';
import { Tip } from '../generic';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';
import { path, pathOr } from 'ramda';

const HeaderImage = styled.div`
  background-color: var(--color-gray-light);
  background-image: url(${props => props.src});
  background-size: cover;
  display: flex;
  flex-direction: column;
  position: ${props => (!props.src ? 'initial' : 'relative')};

  height: ${props =>
    !props.src && !props.loading ? 'auto !important' : 'auto'};

  transition: 0.2s ease all;
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
  box-shadow: ${props => (props.hasImage ? '0 4px 8px 0 #00000080' : 'none')};
  margin-top: ${props => (props.hasImage ? '20vh' : '5vh')};
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
          hasImage={!!image}
          className={classnames(CLASS_NAMES.HERO_CONTENT, contentClassName)}
        >
          {children}
        </Content>
      )}
    </HeaderImage>
  );
};
