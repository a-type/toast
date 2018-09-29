import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import { Arrow, Wrapper } from './components';
import { Bubble } from 'components/generic';
import OutsideClickHandler from 'react-outside-click-handler';
import Foreground from '../Foreground';

export default class Tip extends React.Component {
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
                    innerRef={ref}
                    style={style}
                    data-placement={placement}
                  >
                    <Bubble>{tipContent}</Bubble>
                    <Arrow innerRef={arrowProps.ref} style={arrowProps.style} />
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
