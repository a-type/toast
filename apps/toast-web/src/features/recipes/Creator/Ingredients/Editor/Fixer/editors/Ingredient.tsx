import React from 'react';
import { Button, Modal } from 'components/generic';
import Picker from 'features/ingredients/Picker';
import { Ingredient } from 'generated/schema';

export interface IngredientEditorProps {
  onChange(value: Ingredient): void;
  value: Ingredient;
}

export default class IngredientEditor extends React.Component<
  IngredientEditorProps
> {
  state = {
    editing: false,
  };

  showModal = () => this.setState({ editing: true });
  hideModal = () => this.setState({ editing: false });

  render() {
    const { onChange, value } = this.props;
    const { editing } = this.state;

    return (
      <React.Fragment>
        <span>We detected: {value.name}</span>
        <Button onClick={this.showModal} label="Change ingredient" />
        {editing && (
          <Modal visible onClose={this.hideModal}>
            <Modal.TitleBar>
              <span>Edit {name}</span>
              <Button onClick={this.hideModal} label="&times;" />
            </Modal.TitleBar>
            <Picker value={value} onChange={onChange} />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
