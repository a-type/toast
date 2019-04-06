import React, { FC, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

export interface SidebarGestureContainerProps {
  open: boolean;
  setOpen(open: boolean): void;
}

const WIDTH = 300;

const getNaturalPosition = open => (open ? 0 : -WIDTH);

export const SidebarGestureContainer: FC<SidebarGestureContainerProps> = ({
  children,
  open,
  setOpen,
}) => {
  const naturalPosition = getNaturalPosition(open);
  const [{ x }, set] = useSpring<{ x: number }>(() => ({
    config: { mass: 1, tension: 500, friction: 50 },
    x: naturalPosition,
  }));
  const bind = useGesture(
    ({ down, x: gestureX, xInitial, args: [element, isCurrentlyOpen] }) => {
      const isWindow = element === 'window';

      const wasTapOutside =
        isCurrentlyOpen &&
        isWindow &&
        !down &&
        gestureX > WIDTH &&
        xInitial > WIDTH &&
        Math.abs(gestureX - xInitial) < 15;

      const validGestureStart = isCurrentlyOpen
        ? xInitial - WIDTH + 25 > 0
        : xInitial < 25;

      const validGestureMovement = isCurrentlyOpen
        ? gestureX - xInitial < 25 || (gestureX > WIDTH && xInitial > WIDTH)
        : gestureX - xInitial > 25;

      if (!validGestureStart || !validGestureMovement) {
        return;
      }

      let xOffset = Math.max(-WIDTH, Math.min(0, gestureX - WIDTH));

      if (down) {
        set({ x: xOffset });
      } else {
        const becomeClosed = wasTapOutside || Math.abs(xOffset + WIDTH) < 25;
        setOpen(!becomeClosed);
        set({ x: getNaturalPosition(!becomeClosed) });
      }
    },
  );

  useEffect(() => {
    set({ x: getNaturalPosition(open) });
  }, [open]);

  // bind to window
  useEffect(() => {
    const cb = bind('window', open);
    window.addEventListener('mousedown', cb.onMouseDown, { passive: true });
    window.addEventListener('touchstart', cb.onTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousedown', cb.onMouseDown);
      window.removeEventListener('touchstart', cb.onTouchStart);
    };
  }, [open]);

  return (
    <animated.div
      {...bind('sidebar', open)}
      style={{
        position: 'fixed',
        left: x,
        height: '100vh',
        zIndex: 100,
      }}
    >
      {children}
    </animated.div>
  );
};

export default SidebarGestureContainer;
