import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Icon from 'components/generic/Icon';
import classnames from 'classnames';
import { IconButton } from '@material-ui/core';

const background = ({ type }) => {
  switch (type) {
    case 'error':
      return 'var(--color-error)';
    case 'success':
      return 'var(--color-secondary)';
    default:
      return 'var(--color-content-background)';
  }
};

const color = ({ type }) => {
  switch (type) {
    case 'error':
    case 'success':
      return 'var(--color-white)';
    default:
      return 'var(--color-content-foreground)';
  }
};

const AlertBorder = styled.div`
  background-color: ${background};
  color: ${color};
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 8px 0 var(--color-shadow-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100vw - 60px);
  margin: 30px;
  z-index: 1000;

  @media (min-width: 720px) {
    width: 300px;
  }
`;

const typeToClassName = type => {
  switch (type) {
    case 'error':
      return 'negative-content';
    case 'success':
      return 'positive-content';
    default:
      return '';
  }
};

export interface AlertProps {
  style?: any;
  message: string | ReactNode;
  options?: any;
  close?: () => void;
}

export const Alert: FC<AlertProps> = ({
  style,
  options = { type: 'info' },
  message,
  close,
}) => {
  return (
    <AlertBorder
      {...style}
      type={options.type}
      className={classnames('alert', typeToClassName(options.type))}
    >
      <span>{message}</span>
      {close && (
        <IconButton>
          <Icon name="clear" />
        </IconButton>
      )}
    </AlertBorder>
  );
};

export default Alert;
