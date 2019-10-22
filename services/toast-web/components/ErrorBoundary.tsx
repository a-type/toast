import React, { Component } from 'react';
import logger from 'utils/logger';
import ErrorMessage from './ErrorMessage';

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    logger.fatal(error, info);
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage error={this.state.error} />;
    }

    return this.props.children;
  }
}
