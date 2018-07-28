import React from 'react';
import { Spring, animated } from 'react-spring';

export default ({ collapsed, children }) => (
  <div style={{ position: 'relative' }}>
    <Spring
      native
      from={{ height: 0, overflowY: 'hidden' }}
      to={{ height: !collapsed ? 'auto' : 0, overflowY: 'hidden' }}
    >
      {props => (
        <animated.div className="collapse" style={props}>
          {children}
        </animated.div>
      )}
    </Spring>
  </div>
);
