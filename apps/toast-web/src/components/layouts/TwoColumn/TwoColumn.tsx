import React from 'react';
import styled from 'styled-components';
import { CLASS_NAMES } from '../constants';
import classnames from 'classnames';
import { gridAreas } from 'components/effects';
import { cold } from 'react-hot-loader';
import { useMedia } from 'react-use';
import Context from '../layoutContext';
import { ContentArea } from '../types';
import Tab from './Tab';
import { Icon } from 'components/generic';
import Shelf from './Shelf';
import BaseLayout, { BaseLayoutProps } from '../components/BaseLayout';

const BREAK_POINT = 1200;

const contentAsRows = ({ visibleContentAreas }) =>
  `'navigation' 'banner' 'tabs' ${visibleContentAreas
    .map(area => `'${area}'`)
    .join(' ')}`;
const makeRow = (name, repeat) => `'${new Array(repeat).fill(name).join(' ')}'`;
const contentAsColumns = ({ visibleContentAreas }) =>
  `${makeRow('navigation', visibleContentAreas.length)} ${makeRow(
    'banner',
    visibleContentAreas.length,
  )} '${visibleContentAreas.join(' ')}'`;

const Layout = styled<BaseLayoutProps & { visibleContentAreas: ContentArea[] }>(
  ({ visibleContentAreas, ...rest }) => <BaseLayout {...rest} />,
)`
  grid-template-areas: ${contentAsRows};
  grid-template-rows: repeat(3, auto) 1fr;

  & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.CONTROLS} {
    margin: 0 auto;
    padding-top: var(--spacing-md);
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    padding-bottom: var(--spacing-md);
  }

  & .${CLASS_NAMES.CONTENT} {
    padding-top: var(--spacing-xl);
    padding-bottom: var(--spacing-xl);
    border-radius: var(--border-radius-md);
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

  ${gridAreas(['banner', 'secondary', 'main'])};
`;

export interface TwoColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  tabNames?: string[];
  tabIcons?: string[];
  flipped?: boolean;
}

const CONTENT_ORDER: ContentArea[] = ['main', 'secondary'];
const DEFAULT_TAB_NAMES = ['Main', 'Secondary'];
const DEFAULT_TAB_ICONS = ['three-dots-symbol', 'three-dots-symbol'];

const TwoColumnLayout: React.SFC<TwoColumnLayoutProps> = ({
  children,
  className,
  tabNames = DEFAULT_TAB_NAMES,
  tabIcons = DEFAULT_TAB_ICONS,
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

  const contentAreaIndex = CONTENT_ORDER.indexOf(activeContentArea);
  const activeTab = tabNames[contentAreaIndex];
  const onTabChange = (_, tabIndex) =>
    setActiveContent(CONTENT_ORDER[tabIndex]);

  return (
    <Context.Provider value={{ activeContents, setActiveContent }}>
      <Layout
        visibleContentAreas={visibleContentAreas}
        className={classnames(className, CLASS_NAMES.LAYOUT)}
        {...rest}
      >
        {children}
        {isNarrow && (
          <Tab
            onClick={() =>
              setActiveContent(
                activeContentArea === 'main' ? 'secondary' : 'main',
              )
            }
          >
            <Icon
              name={activeContentArea === 'main' ? tabIcons[1] : 'next-page'}
            />{' '}
            {activeContentArea === 'main' ? tabNames[1] : 'Back'}
          </Tab>
        )}
        {isNarrow && (
          <Shelf
            expanded={activeContentArea === 'secondary'}
            data-content-portal-target="secondary"
          />
        )}
      </Layout>
    </Context.Provider>
  );
};

export default cold(TwoColumnLayout);
