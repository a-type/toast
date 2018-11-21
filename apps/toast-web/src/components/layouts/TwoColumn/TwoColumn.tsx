import React from 'react';
import styled from 'styled-components';
import { CLASS_NAMES } from '../constants';
import classnames from 'classnames';
import { gridAreas } from 'components/effects';
import { cold } from 'react-hot-loader';
import { useMedia } from 'react-use';
import Context from '../layoutContext';
import { ContentArea } from '../types';
import Tabs from './Tabs';

const BREAK_POINT = 1200;

const contentAsRows = ({ visibleContentAreas }) =>
  `'banner' 'tabs' ${visibleContentAreas.map(area => `'${area}'`).join(' ')}`;
const makeRow = (name, repeat) => `'${new Array(repeat).fill(name).join(' ')}'`;
const contentAsColumns = ({ visibleContentAreas }) =>
  `${makeRow('banner', visibleContentAreas.length)} '${visibleContentAreas.join(
    ' ',
  )}'`;

const Layout = styled<{ visibleContentAreas: ContentArea[] }, 'div'>('div')`
  width: 100%;
  display: grid;
  grid-template-areas: ${contentAsRows};
  grid-template-rows: auto auto auto;
  position: relative;
  z-index: 1;

  & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.CONTROLS} {
    margin: 0 auto;
    transition: 0.2s ease all;
    width: 100%;
    padding-top: var(--spacing-md);
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    padding-bottom: var(--spacing-md);
  }

  & .${CLASS_NAMES.CONTENT} {
    padding-top: var(--spacing-xl);
    border-radius: var(--border-radius-md);
  }

  & .${CLASS_NAMES.BANNER} {
    grid-area: banner;
    width: 100%;
  }

  @media (min-width: ${BREAK_POINT}px) {
    grid-template-areas: ${contentAsColumns};
    grid-template-columns: 2fr 1fr;

    & .${CLASS_NAMES.CONTENT} {
      padding-left: var(--spacing-xl);
      padding-right: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
    }
  }

  @media (min-width: 1600px) {
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }

  ${gridAreas(['banner', 'secondary', 'main'])};
`;

export interface TwoColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  tabNames: string[];
  flipped?: boolean;
}

const CONTENT_ORDER: ContentArea[] = ['main', 'secondary'];
const DEFAULT_TAB_NAMES = ['Main', 'Secondary'];

const TwoColumnLayout: React.SFC<TwoColumnLayoutProps> = ({
  children,
  className,
  tabNames = DEFAULT_TAB_NAMES,
  flipped = false,
  ...rest
}) => {
  const isNarrow = useMedia(`(max-width: ${BREAK_POINT - 1}px)`);

  const [activeContentArea, setActiveContent] = React.useState<ContentArea>(
    'main',
  );
  const activeContents = !isNarrow
    ? new Set<ContentArea>(CONTENT_ORDER)
    : new Set<ContentArea>([activeContentArea]);

  const visibleContentAreas = Array.from(activeContents).sort(
    (a, b) => CONTENT_ORDER.indexOf(a) - CONTENT_ORDER.indexOf(b),
  );

  const activeTab = tabNames[CONTENT_ORDER.indexOf(activeContentArea)];
  const onTabChange = (_, tabIndex) =>
    setActiveContent(CONTENT_ORDER[tabIndex]);

  return (
    <Context.Provider value={{ activeContents, setActiveContent }}>
      <Layout
        visibleContentAreas={visibleContentAreas}
        className={classnames(className, CLASS_NAMES.LAYOUT)}
        {...rest}
      >
        {!isNarrow && (
          <Tabs
            tabNames={tabNames}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        )}
        {children}
      </Layout>
    </Context.Provider>
  );
};

export default cold(TwoColumnLayout);
