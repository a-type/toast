import React, { Component } from 'react';
import logger from 'logger';
import ErrorMessage from './ErrorMessage';

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    logger.fatal(error, info);
  }

  componentDidUpdate() {
    if (process.env.NODE_ENV !== 'production') {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage error={this.state.error} />;
    }

    return this.props.children;
  }
}
