import React from 'react';
import Picker from 'features/ingredients/Picker';
import { Ingredient } from 'generated/schema';
import { Layer, Box, Text, Button } from 'grommet';

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
          <Layer onClickOutside={this.hideModal}>
            <Box direction="row">
              <Text margin={{ right: 'auto', vertical: 'auto' }}>
                Edit {name}
              </Text>
              <Button onClick={this.hideModal} label="&times;" />
            </Box>
            <Picker value={value} onChange={onChange} />
          </Layer>
        )}
      </React.Fragment>
    );
  }
}
