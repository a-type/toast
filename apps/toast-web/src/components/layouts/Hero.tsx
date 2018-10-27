import React from 'react';
import styled from 'styled-components';
import { Tip } from '../generic';
import { CLASS_NAMES } from './constants';
import classnames from 'classnames';
import { path, pathOr } from 'ramda';

const HeaderImage = styled<{ src: string; loading: boolean }, 'div'>('div')`
  background-color: var(--color-gray-light);
  background-image: url(${props => props.src});
  background-size: cover;
  display: flex;
  flex-direction: column;
  position: ${props => (!props.src ? 'initial' : 'relative')};

  height: ${props =>
    !props.src && !props.loading ? 'auto !important' : 'auto'};

  transition: 0.2s ease all;

  box-shadow: ${props =>
    !!props.src ? 'inset 0 -4px 8px 0 var(--color-shadow)' : 'none'};
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

const Content = styled<{ hasImage: boolean }, 'div'>('div')`
  background: var(--color-white);
  color: var(--color-dark);
  padding: var(--spacing-lg);
  box-shadow: ${props => (props.hasImage ? 'var(--shadow-md)' : 'none')};
  margin-top: ${props => (props.hasImage ? '20vh' : '5vh')};
`;

const ImageAttribution = ({ attribution }) => (
  <Tip.Toggle placement="left" tipContent={`Image © ${attribution}`}>
    {({ ref, onClick }) => (
      <ImageAttributionIcon ref={ref as any} onClick={onClick}>
        ©
      </ImageAttributionIcon>
    )}
  </Tip.Toggle>
);

interface HeroProps {
  image?: string;
  loading?: boolean;
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

const Hero: React.SFC<HeroProps> = ({
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

export default Hero;
