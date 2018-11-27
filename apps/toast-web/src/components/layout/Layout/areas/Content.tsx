import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { CLASS_NAMES } from '../../constants';
import styled from 'styled-components';
import { cold } from 'react-hot-loader';

export const BaseContentStyles = styled<{ scroll?: boolean }, 'div'>('div')`
  background: var(--color-content-background);
  color: var(--color-content-foreground);
  padding: 0;

  @media (min-width: 900px) {
    padding: 0;
  }
`;

export type ContentProps = {
  className?: string;
  mode?: 'default' | 'overlay';
  children: React.ReactNode;
  scroll?: boolean;
};

const Content = ({
  className,
  mode = 'default',
  children,
  scroll,
  ...rest
}: ContentProps) => {
  return (
    <BaseContentStyles
      className={classnames(className, CLASS_NAMES.CONTENT)}
      scroll={scroll}
      {...rest}
    >
      {children}
    </BaseContentStyles>
  );
};

export default cold(Content);
