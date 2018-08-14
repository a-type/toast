// @flow

import React from 'react';
import { Bubble } from './components';
import { Button, Modal } from 'components/generic';

type Props = {
  color: string,
  name: string,
  onChange(newValue: mixed): mixed,
  value: mixed,
  renderEditor(value: mixed, save: (newValue: mixed) => mixed): mixed,
  renderDisplayValue(value: mixed): mixed,
};

type State = {
  editable: boolean,
};

export default class EditableTag extends React.PureComponent<Props, State> {
  static defaultProps = {
    renderDisplayValue: val => val,
  };

  state = {
    editable: false,
  };

  handleSave = (value: mixed) => {
    this.props.onChange(value);
    this.stopEditing();
  };

  stopEditing = () => this.setState({ editable: false });
  edit = () => this.setState({ editable: true });

  render() {
    const { editable } = this.state;
    const {
      value,
      color,
      renderEditor,
      renderDisplayValue,
      onChange,
      name,
    } = this.props;

    return (
      <React.Fragment>
        <Bubble color={color}>
          <span>{renderDisplayValue(value)}&nbsp;</span>
          <Button.Icon name="edit" onClick={this.edit} />
        </Bubble>
        {editable && (
          <Modal visible onClose={this.stopEditing}>
            <Modal.TitleBar>
              <span>Edit {name}</span>
              <Button onClick={this.stopEditing}>&times;</Button>
            </Modal.TitleBar>
            {renderEditor(value, this.handleSave)}
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
