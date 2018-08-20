import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import { Arrow, Bubble } from './components';
import OutsideClickHandler from 'react-outside-click-handler';

export default ({
  children,
  tipContent,
  disabled = false,
  placement = 'top',
  positionFixed = true,
  onBlur = () => null,
}) => (
  <Manager>
    <Reference>{children}</Reference>
    {!disabled && (
      <Popper placement={placement} positionFixed={positionFixed}>
        {({ ref, style, placement, arrowProps, scheduleUpdate }) => (
          <OutsideClickHandler onOutsideClick={onBlur}>
            <Bubble
              onBlur={onBlur}
              innerRef={ref}
              style={style}
              data-placement={placement}
            >
              {tipContent}
              <Arrow innerRef={arrowProps.ref} style={arrowProps.style} />
            </Bubble>
          </OutsideClickHandler>
        )}
      </Popper>
    )}
  </Manager>
);
