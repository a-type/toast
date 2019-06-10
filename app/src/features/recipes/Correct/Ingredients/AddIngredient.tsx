import React, { FC, useState } from 'react';
import { Button, TextField, Box } from '@material-ui/core';

export interface AddIngredientProps {
  submitAdd(added: string): void;
}

export const AddIngredient: FC<AddIngredientProps> = ({ submitAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');

  if (!showForm) {
    return (
      <Button color="secondary" onClick={() => setShowForm(true)}>
        Suggest missing ingredient
      </Button>
    );
  }

  return (
    <Box>
      <TextField
        label="Ingredient text"
        multiline
        fullWidth
        value={text}
        onChange={ev => setText(ev.target.value)}
        style={{ marginBottom: '8px' }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => submitAdd(text)}
      >
        Add
      </Button>
      <Button
        variant="text"
        style={{ marginLeft: '8px' }}
        onClick={() => setShowForm(false)}
      >
        Cancel
      </Button>
    </Box>
  );
};
