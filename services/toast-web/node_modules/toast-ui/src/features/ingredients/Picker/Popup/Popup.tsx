import * as React from 'react';
import Downshift from 'downshift';
import Suggestions from './Suggestions';
import { Dialog, makeStyles, TextField } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const CreateFoodMutation = gql`
  mutation PickerCreateFood($name: String!) {
    createFood(input: { name: $name }) {
      id
      name
    }
  }
`;

const ingredientToString = ingredient => {
  if (!ingredient) {
    return '';
  }

  if (ingredient.id) {
    return ingredient.name;
  }

  return ingredient.name + ' (create)';
};

interface IngredientPickerPopupProps {
  onCancel(): void;
  onChange(ingredient: { id: string; name: string }): void;
  value: { id: string; name: string };
  canCreate?: boolean;
  initialSearchText?: string;
}

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
    width: '75vw',
    maxWidth: '500px',
    height: '50vh',
  },
}));

const IngredientPickerPopup: React.SFC<IngredientPickerPopupProps> = ({
  onChange,
  onCancel,
  canCreate,
  value,
  initialSearchText,
}) => {
  const classes = useStyles({});
  const mutate = useMutation(CreateFoodMutation);
  const handleChange = async (newValue: { id: string; name: string }) => {
    if (!newValue.id) {
      const result = await mutate({
        variables: { name: newValue.name },
      });
      if (result) {
        onChange(result.data.createFood);
      }
    } else {
      onChange(newValue);
    }
  };
  return (
    <Dialog open onClose={onCancel} classes={{ paper: classes.dialog }}>
      <Downshift
        onChange={handleChange}
        itemToString={ingredientToString}
        defaultInputValue={initialSearchText}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
        }) => {
          return (
            <div>
              <TextField
                fullWidth
                label="Search ingredients"
                variant="outlined"
                inputProps={getInputProps({ style: { width: '100%' } })}
              />
              <Suggestions
                term={inputValue}
                getItemProps={getItemProps}
                selectedItem={selectedItem}
                highlightedIndex={highlightedIndex}
                canCreate={canCreate}
              />
            </div>
          );
        }}
      </Downshift>
    </Dialog>
  );
};

export default IngredientPickerPopup;
