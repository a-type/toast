import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import { Arrow, Bubble } from './components';

export default ({
  children,
  tipContent,
  disabled = false,
  placement = 'bottom',
  positionFixed = true,
}) => (
  <Manager>
    <Reference>{children}</Reference>
    {!disabled && (
      <Popper placement={placement} positionFixed={positionFixed}>
        {({ ref, style, placement, arrowProps, scheduleUpdate }) => (
          <Bubble innerRef={ref} style={style} data-placement={placement}>
            {tipContent}
            <Arrow innerRef={arrowProps.ref} style={arrowProps.style} />
          </Bubble>
        )}
      </Popper>
    )}
  </Manager>
);
