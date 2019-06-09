import React, { FC, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

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
    <>
      <TextField
        label="Ingredient text"
        multiline
        value={text}
        onChange={ev => setText(ev.target.value)}
      />
      <Button onClick={() => submitAdd(text)}>Add</Button>
    </>
  );
};
