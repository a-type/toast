import React from 'react';
import context from './context';

export default class BackgroundManager extends React.Component {
  state = {
    backgrounds: new Set(),
  };

  register = key => {
    if (!key) {
      throw new Error('Every Background must have a backgroundKey prop');
    }

    const { backgrounds } = this.state;
    backgrounds.add(key);

    this.setState({ backgrounds });
  };

  unregister = key => {
    const { backgrounds } = this.state;
    backgrounds.delete(key);

    this.setState({ backgrounds });
  };

  render() {
    const { children } = this.props;
    const { backgrounds } = this.state;

    return (
      <context.Provider
        value={{
          hasBackground: backgrounds.size > 0,
          register: this.register,
          unregister: this.unregister,
        }}
      >
        {children}
      </context.Provider>
    );
  }
}
