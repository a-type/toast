import React from 'react';
import { Button, Modal } from 'components/generic';
import Picker from 'components/ingredients/Picker';

export default class IngredientEditor extends React.Component {
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
        <Button onClick={this.showModal}>Change ingredient</Button>
        {editing && (
          <Modal visible onClose={this.hideModal}>
            <Modal.TitleBar>
              <span>Edit {name}</span>
              <Button onClick={this.hideModal}>&times;</Button>
            </Modal.TitleBar>
            <Picker value={value} onChange={onChange} />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
