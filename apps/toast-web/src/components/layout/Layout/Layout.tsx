import React from 'react';
import styled, { css } from 'styled-components';
import { CLASS_NAMES, BREAK_POINT } from '../constants';
import classnames from 'classnames';
import { gridAreas } from 'components/effects';
import { cold } from 'react-hot-loader';
import { useMedia } from 'react-use';
import Context from '../layoutContext';
import { BackgroundStyle } from '../types';
import Shelf from './Shelf';
import * as Areas from './areas';
import { BackdropArt } from 'components/brand';
import { Background } from 'components/generic';
import { Navigation } from 'features/structure';

export interface BaseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  noScroll?: boolean;
  backgroundStyle: BackgroundStyle;
}

const backgroundBrandCss = css`
  --color-content-foreground: var(--color-dark);
  --color-content-background: var(--color-brand);
  --color-heading: var(--color-dark);
  --color-field-background: var(--color-brand-dark);
  --color-field-foreground: var(--color-white);
  --color-control-background: var(--color-brand-light);
  --color-control-foreground: var(--color-dark);
`;

const Layout = styled<BaseLayoutProps, 'div'>('div')`
  width: 100%;
  height: 100%;
  overflow-y: ${props => (props.noScroll ? 'hidden' : 'auto')};
  overflow-x: hidden;
  position: relative;
  display: grid;
  padding: var(--spacing-sm);

  grid-template-areas: 'navigation' 'banner' 'content';
  grid-template-rows: auto auto 1fr auto;

  background: ${props =>
    props.backgroundStyle === BackgroundStyle.Brand
      ? 'var(--color-brand)'
      : 'transparent'};

  & > .${CLASS_NAMES.NAVIGATION} {
    grid-area: navigation;

    width: 100%;
    padding-top: var(--spacing-md);
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    padding-bottom: var(--spacing-md);
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
    overflow-y: auto;
    overflow-y: overlay;
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
    grid-template-areas: 'navigation navigation' 'banner banner' 'content secondaryContent';
    grid-template-columns: 2fr 1fr;
  }

  @media (min-width: 768px) {
    & .${CLASS_NAMES.CONTENT}, & .${CLASS_NAMES.NAVIGATION} {
      padding-left: var(--spacing-xl);
      padding-right: var(--spacing-xl);
    }

    & .${CLASS_NAMES.BANNER} {
      padding-left: calc(var(--spacing-sm) + var(--spacing-xl));
      padding-right: calc(var(--spacing-sm) + var(--spacing-xl));
    }

    & .${CLASS_NAMES.CONTENT} {
      padding-bottom: var(--spacing-lg);
    }
  }

  ${gridAreas(['banner', 'secondary', 'main'])};
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
type SecondaryContentToggleFn = () => void;
export type SecondaryContentRenderFn = (
  { hidden: boolean, toggle: SecondaryContentToggleFn },
) => React.ReactNode;

export interface TwoColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  backgroundStyle?: BackgroundStyle;
  noScroll?: boolean;
  secondaryContentIcon?: string;
  renderNavigation?: NavigationRenderFn;
  renderBanner?: BannerRenderFn;
  renderSecondaryContent?: SecondaryContentRenderFn;
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
  ...rest
}) => {
  const isNarrow = useMedia(`(max-width: ${BREAK_POINT - 1}px)`);
  const [
    stateSecondaryContentHidden,
    setSecondaryContentHidden,
  ] = React.useState(true);
  const [registeredControls, setRegisteredControls] = React.useState(
    new Set<string>(),
  );
  const [controlsElement, setControlsElement] = React.useState(null);

  const secondaryContentHidden = isNarrow && stateSecondaryContentHidden;
  const toggleSecondaryContent = () =>
    setSecondaryContentHidden(wasHidden => !wasHidden);
  const hasSecondaryContent = !!renderSecondaryContent;

  const registerControl = (controlName: string, present: boolean) => {
    setRegisteredControls(oldSet => {
      if (present) {
        oldSet.add(controlName);
      } else {
        oldSet.delete(controlName);
      }
      return oldSet;
    });
  };

  return (
    <Context.Provider
      value={{
        secondaryContentHidden,
        toggleSecondaryContent,
        hasSecondaryContent,
        secondaryContentIcon,
        isNarrow,
        registerControl,
        hasControls: registeredControls.size > 0,
        controlsElement,
      }}
    >
      <React.Fragment>
        {backgroundStyle === BackgroundStyle.Art && (
          <Background backgroundKey="layout">
            <BackdropArt />
          </Background>
        )}
        <Layout
          className={classnames(className, CLASS_NAMES.LAYOUT)}
          backgroundStyle={backgroundStyle}
          {...rest}
        >
          {!!renderNavigation && (
            <Areas.Navigation>{renderNavigation()}</Areas.Navigation>
          )}
          {!!renderBanner && <Areas.Banner>{renderBanner()}</Areas.Banner>}

          <Areas.Content>{children}</Areas.Content>

          {hasSecondaryContent &&
            (isNarrow ? (
              <Shelf expanded={!secondaryContentHidden}>
                <Areas.Content className={CLASS_NAMES.SECONDARY_CONTENT}>
                  {renderSecondaryContent({
                    hidden: secondaryContentHidden,
                    toggle: toggleSecondaryContent,
                  })}
                </Areas.Content>
              </Shelf>
            ) : (
              <Areas.Content className={CLASS_NAMES.SECONDARY_CONTENT}>
                {renderSecondaryContent({
                  hidden: secondaryContentHidden,
                  toggle: toggleSecondaryContent,
                })}
              </Areas.Content>
            ))}

          <Areas.Controls ref={setControlsElement} />
        </Layout>
      </React.Fragment>
    </Context.Provider>
  );
};

export default cold(TwoColumnLayout);
