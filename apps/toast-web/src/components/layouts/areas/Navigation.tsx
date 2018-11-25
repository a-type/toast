import * as React from 'react';
import classnames from 'classnames';
import { CLASS_NAMES } from '../constants';
import styled from 'styled-components';

const LayoutNavigationStyles = styled<{}, 'div'>('div')`
  display: grid;
  grid-template-areas: 'logo controls';
  grid-template-columns: 1fr auto;
  grid-template-rows: auto;
  grid-gap: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-md);
  align-content: end;
  height: auto;
  margin-left: auto;
  margin-right: auto;

  & > *[data-grid-area='logo'] {
    grid-area: logo;
    justify-self: start;
  }
  & > *[data-grid-area='controls'] {
    grid-area: controls;
    margin: auto;
  }

  @media (min-width: 1000px) {
    width: auto;
    padding: var(--spacing-md) var(--spacing-lg);
    grid-gap: var(--spacing-lg);
  }

  @media (min-width: 1600px) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
`;

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {}

const Navigation: React.SFC<NavigationProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <LayoutNavigationStyles
      className={classnames(className, CLASS_NAMES.NAVIGATION)}
      {...rest}
    >
      {children}
    </LayoutNavigationStyles>
  );
};

export default Navigation;
