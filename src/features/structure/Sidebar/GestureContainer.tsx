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
  const bind = useGesture(({ down, x: gestureX, xInitial, args }) => {
    const isWindow = args[0].element === 'window';
    const controllingGesture = isWindow
      ? xInitial < 25 || xInitial - gestureX > 50
      : true;

    const xOffset = Math.max(-WIDTH, Math.min(0, gestureX - WIDTH));

    if (controllingGesture) {
      if (down) {
        set({ x: xOffset });
      } else {
        const becomeClosed = Math.abs(xOffset + WIDTH) < 25;
        setOpen(!becomeClosed);
        set({ x: getNaturalPosition(!becomeClosed) });
      }
    }
  });

  useEffect(() => {
    set({ x: getNaturalPosition(open) });
  }, [open]);

  // bind to window
  useEffect(() => {
    const cb = bind({ element: 'window' });
    window.addEventListener('mousedown', cb.onMouseDown, { passive: true });
    window.addEventListener('touchstart', cb.onTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousedown', cb.onMouseDown);
      window.removeEventListener('touchstart', cb.onTouchStart);
    };
  }, []);

  return (
    <animated.div
      {...bind({ element: 'sidebar' })}
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
