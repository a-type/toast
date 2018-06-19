// @flow
import React from 'react';
import List from './List';
import { H2 } from 'components/typeset';
import { type RecipeStep } from 'types';
import { Transition, animated, config } from 'react-spring';

export default ({ steps }: { steps: Array<RecipeStep> }) => (
  <div>
    <H2>Steps</H2>
    <List>
      <Transition
        native
        keys={steps.map(({ step: { id } }) => id)}
        from={{ opacity: 0, height: 0 }}
        enter={{ opacity: 1, height: 'auto' }}
        leave={{ opacity: 0, height: 0 }}
        config={config.slow}
      >
        {steps.map(({ index, step: { id, text } }) => styles => (
          <animated.li style={{ ...styles, overflowY: 'hidden' }} key={id}>
            {index ? index + 1 : 1}. {text}
          </animated.li>
        ))}
      </Transition>
    </List>
  </div>
);
