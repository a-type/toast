import * as React from 'react';
import styled from 'styled-components';
import { CLASS_NAMES } from '../constants';

export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  noScroll?: boolean;
}

const BaseLayout = styled<BaseLayoutProps, 'div'>('div')`
  width: 100%;
  height: 100%;
  overflow-y: ${props => (props.noScroll ? 'hidden' : 'auto')};
  overflow-x: hidden;
  position: relative;
  display: grid;
  padding: var(--spacing-sm);

  & > .${CLASS_NAMES.NAVIGATION} {
    grid-area: navigation;
  }

  & > .${CLASS_NAMES.CONTENT} {
    grid-area: content;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    overflow-y: ${props => (props.noScroll ? 'auto' : 'visible')};
    overflow-y: ${props => (props.noScroll ? 'overlay' : 'visible')};
  }

  & > .${CLASS_NAMES.CONTROLS} {
    grid-area: controls;
  }

  & > .${CLASS_NAMES.BANNER} {
    grid-area: banner;
    margin: 0 calc(-1 * var(--spacing-sm));
    width: 100vw;
  }
`;

export default BaseLayout;
