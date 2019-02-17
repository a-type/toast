import React from 'react';
import styled, { css } from 'styled-components';
import { CLASS_NAMES, BREAK_POINT } from '../constants';
import classnames from 'classnames';
import { gridAreas } from 'components/effects';
import { cold } from 'react-hot-loader';
import { BackgroundStyle } from '../types';
import * as Areas from './areas';
import { BackdropArt } from 'components/brand';
import { Background } from 'components/generic';
import { Navigation } from 'features/structure';

export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  noScroll?: boolean;
  backgroundStyle: BackgroundStyle;
  secondaryContentFirst?: boolean;
  noSpacing?: boolean;
}

const backgroundBrandCss = css`
  --color-content-foreground: var(--color-dark);
  --color-content-background: var(--color-brand);
  --color-heading: var(--color-dark);
  --color-field-background: var(--color-brand-dark);
  --color-field-foreground: var(--color-dark);
  --color-control-background: var(--color-brand-light);
  --color-control-foreground: var(--color-dark);
  --color-link-foreground: var(--color-brand-dark);
  --color-link-active: var(--color-dark);
`;

const Layout = styled<BaseLayoutProps, 'div'>('div')`
  width: 100%;
  height: 100%;
  overflow-y: ${props => (props.noScroll ? 'hidden' : 'auto')};
  overflow-x: hidden;
  position: relative;
  display: grid;
  padding: ${props => (props.noSpacing ? '0' : 'var(--spacing-sm)')};

  grid-template-areas: ${props =>
    props.secondaryContentFirst
      ? `'navigation' 'banner' 'secondaryContent' 'content'`
      : `'navigation' 'banner' 'content' 'secondaryContent'`};
  grid-template-rows: ${props =>
    props.secondaryContentFirst ? 'auto auto auto 1fr' : 'auto auto 1fr auto'};
  grid-template-columns: 100%;

  background: ${props =>
    props.backgroundStyle === BackgroundStyle.Brand
      ? 'var(--color-brand)'
      : 'transparent'};

  & > .${CLASS_NAMES.NAVIGATION} {
    grid-area: navigation;

    width: 100%;
    padding: var(--spacing-md);
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }

  & > .${CLASS_NAMES.CONTENT} {
    grid-area: content;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    overflow-y: ${props => (props.noScroll ? 'auto' : 'visible')};
    overflow-y: ${props => (props.noScroll ? 'overlay' : 'visible')};
  }

  & > .${CLASS_NAMES.SECONDARY_CONTENT} {
    grid-area: secondaryContent;
  }

  & > .${CLASS_NAMES.CONTROLS} {
    grid-area: controls;
  }

  & > .${CLASS_NAMES.BANNER} {
    grid-area: banner;
    margin: 0 calc(-1 * var(--spacing-sm));
    width: 100vw;
  }

  & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.CONTROLS} {
    margin: 0 auto;
    padding-top: ${props => (props.noSpacing ? '0' : 'var(--spacing-lg)')};
    padding-left: ${props => (props.noSpacing ? '0' : 'var(--spacing-md)')};
    padding-right: ${props => (props.noSpacing ? '0' : 'var(--spacing-md)')};
    padding-bottom: ${props => (props.noSpacing ? '0' : 'var(--spacing-xl)')};
  }

  & .${CLASS_NAMES.CONTENT} {
    border-radius: var(--border-radius-md);
  }

  @media (min-width: ${BREAK_POINT}px) {
    grid-template-areas: ${props =>
      props.secondaryContentFirst
        ? `'navigation navigation' 'banner banner' 'secondaryContent content'`
        : `'navigation navigation' 'banner banner' 'content secondaryContent'`};
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto 1fr;

    & > .${CLASS_NAMES.SECONDARY_CONTENT} {
      overflow-y: auto;
      overflow-y: overlay;
    }
  }

  @media (min-width: 768px) {
    & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.NAVIGATION} {
      padding-left: ${props => (props.noSpacing ? '0' : 'var(--spacing-xl)')};
      padding-right: ${props => (props.noSpacing ? '0' : 'var(--spacing-xl)')};
    }

    & .${CLASS_NAMES.BANNER} {
      padding-left: ${props =>
        props.noSpacing ? '0' : 'calc(var(--spacing-sm) + var(--spacing-xl))'};
      padding-right: ${props =>
        props.noSpacing ? '0' : 'calc(var(--spacing-sm) + var(--spacing-xl))'};
    }

    & .${CLASS_NAMES.CONTENT} {
      padding-bottom: ${props => (props.noSpacing ? '0' : 'var(--spacing-lg)')};
    }
  }

  ${gridAreas(['navigation', 'banner', 'content', 'secondaryContent'])};
  ${props => {
    switch (props.backgroundStyle) {
      case BackgroundStyle.Brand:
        return backgroundBrandCss;
      default:
        return '';
    }
  }};
`;

export type NavigationRenderFn = () => React.ReactNode;
export type BannerRenderFn = () => React.ReactNode;
export type SecondaryContentRenderFn = () => React.ReactNode;

export interface TwoColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  backgroundStyle?: BackgroundStyle;
  noScroll?: boolean;
  noSpacing?: boolean;
  secondaryContentIcon?: string;
  renderNavigation?: NavigationRenderFn;
  renderBanner?: BannerRenderFn;
  renderSecondaryContent?: SecondaryContentRenderFn;
  secondaryContentFirst?: boolean;
}

const TwoColumnLayout: React.SFC<TwoColumnLayoutProps> = ({
  children,
  className,
  backgroundStyle = BackgroundStyle.Blank,
  secondaryContentIcon = 'three-dots-symbol',
  noScroll = false,
  renderNavigation = () => <Navigation />,
  renderBanner,
  renderSecondaryContent,
  secondaryContentFirst = false,
  ...rest
}) => {
  const hasSecondaryContent = !!renderSecondaryContent;

  return (
    <React.Fragment>
      {backgroundStyle === BackgroundStyle.Art && (
        <Background backgroundKey="layout">
          <BackdropArt />
        </Background>
      )}
      <Layout
        className={classnames(className, CLASS_NAMES.LAYOUT)}
        backgroundStyle={backgroundStyle}
        noScroll={noScroll}
        secondaryContentFirst={secondaryContentFirst}
        {...rest}
      >
        {!!renderNavigation && (
          <Areas.Navigation>{renderNavigation()}</Areas.Navigation>
        )}
        {!!renderBanner && <Areas.Banner>{renderBanner()}</Areas.Banner>}

        <Areas.Content>{children}</Areas.Content>

        {hasSecondaryContent && (
          <Areas.Content className={CLASS_NAMES.SECONDARY_CONTENT}>
            {renderSecondaryContent()}
          </Areas.Content>
        )}
      </Layout>
    </React.Fragment>
  );
};

export default cold(TwoColumnLayout);
