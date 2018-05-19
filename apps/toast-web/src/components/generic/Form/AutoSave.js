// @flow

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { equals } from 'ramda';

type Props = {
  values: { [string]: mixed },
  render({ isSaving: boolean }): Node,
  onSave({ [string]: mixed }): Promise<mixed>,
};

type State = {
  isSaving: boolean,
  lastSaved: ?Date,
  saveError: ?string,
};

export default class AutoSave extends React.Component<Props, State> {
  static defaultProps = {
    render: () => null,
  };

  state = {
    isSaving: false,
    lastSaved: null,
    saveError: null,
  };

  componentDidUpdate(prevProps: Props) {
    if (!equals(prevProps.values, this.props.values)) {
      this.save();
    }
  }

  save = debounce(async () => {
    this.setState({ isSaving: true, saveError: null });
    try {
      await this.props.onSave(this.props.values);
      this.setState({ isSaving: false, lastSaved: new Date() });
    } catch (err) {
      this.setState({ isSaving: false, saveError: err.message });
    }
  }, 300);

  render() {
    return this.props.render(this.state);
  }
}
