// @flow

import React from 'react';
import EditableTag from './EditableTag';
import { toReadableFraction } from 'readable-fractions';
import { Formik } from 'formik';
import { Field, Input, Button } from 'components/generic';

type Props = {
  value: string,
  onChangeSelection(): mixed,
};

export default class UnitTag extends React.PureComponent<Props> {
  render() {
    const { value, onChangeSelection } = this.props;

    return (
      <EditableTag color="positive-dark" onChangeSelection={onChangeSelection}>
        {value}
      </EditableTag>
    );
  }
}
