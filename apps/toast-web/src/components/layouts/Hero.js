import React from 'react';
import styled from 'styled-components';
import { Tip, Background } from '../generic';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';
import { path, pathOr } from 'ramda';

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

export default ({ image, loading, className, ...rest }) => {
  if (!image && !loading) {
    return null;
  }

  return (
    <Background backgroundKey="hero">
      <HeaderImage
        className={classnames(CLASS_NAMES.HERO, className)}
        src={pathOr(null, ['url'], image)}
        loading={loading}
        {...rest}
      >
        {path(['attribution'], image) && (
          <ImageAttribution attribution={path(['attribution'], image)} />
        )}
      </HeaderImage>
    </Background>
  );
};
