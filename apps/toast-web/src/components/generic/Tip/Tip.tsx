import * as React from 'react';
import {
  Manager,
  Reference,
  Popper,
  ReferenceChildrenProps,
} from 'react-popper';
import { Arrow, Wrapper } from './components';
import { Bubble } from 'components/generic';
import OutsideClickHandler from 'react-outside-click-handler';
import Foreground from '../Foreground';
import { Placement } from 'popper.js';

interface TipProps {
  children(props: ReferenceChildrenProps): React.ReactNode;
  onBlur(ev: MouseEvent): void;
  tipContent: React.ReactNode;
  disabled?: boolean;
  placement?: Placement;
  positionFixed?: boolean;
}

export default class Tip extends React.Component<TipProps> {
  static Toggle: React.ComponentClass;

  handleClickOutside = ev => {
    this.props.onBlur(ev);
  };

  render() {
    const {
      children,
      tipContent,
      disabled = false,
      placement = 'top',
      positionFixed = true,
    } = this.props;
    return (
      <Manager>
        <Reference>{children}</Reference>
        {!disabled && (
          <Popper placement={placement} positionFixed={positionFixed}>
            {({ ref, style, placement, arrowProps, scheduleUpdate }) => (
              <Foreground>
                <OutsideClickHandler
                  onOutsideClick={this.handleClickOutside}
                  useCapture={false}
                  display="inline-block"
                >
                  <Wrapper
                    ref={ref as any}
                    style={style}
                    data-placement={placement}
                  >
                    <Bubble>{tipContent}</Bubble>
                    <Arrow
                      ref={arrowProps.ref as any}
                      style={arrowProps.style}
                    />
                  </Wrapper>
                </OutsideClickHandler>
              </Foreground>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}

interface TipToggleProps extends TipProps {
  children(
    props: ReferenceChildrenProps & { onClick(): void },
  ): React.ReactNode;
}

Tip.Toggle = class TipToggle extends React.PureComponent<TipToggleProps> {
  state = {
    show: false,
  };

  show = () => this.setState({ show: true });
  hide = () => this.setState({ show: false });

  render() {
    const { children, ...rest } = this.props;

    return (
      <Tip disabled={!this.state.show} onBlur={this.hide} {...rest}>
        {({ ref }) => children({ ref, onClick: this.show })}
      </Tip>
    );
  }
};
