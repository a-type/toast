import * as React from 'react';
import { Day } from 'types/Day';
import { MenuItem } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { TextField } from 'components/fields';

const SetGroceryDayMutation = gql`
  mutation SetGroceryDay($groceryDay: WeekDay!) {
    setGroceryDay(input: { groceryDay: $groceryDay }) {
      id
      groceryDay
    }
  }
`;

export interface GroceryDayEditFormProps {
  groceryDay: number;
  onSaved?(): void;
}

const GroceryDayEditForm: React.SFC<GroceryDayEditFormProps> = ({
  groceryDay,
  onSaved = () => {},
}) => {
  const [mutate] = useMutation(SetGroceryDayMutation);

  const handleChange = async ev => {
    await mutate({
      variables: {
        groceryDay: ev.target.value,
      },
    });
    onSaved && onSaved();
  };

  return (
    <TextField
      select
      onChange={handleChange}
      value={groceryDay}
      label="Grocery day"
      id="grocery-day"
      name="groceryDay"
    >
      {new Array(7).fill(null).map((_, dayIndex) => (
        <MenuItem key={dayIndex} value={dayIndex}>
          {Day[dayIndex]}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default GroceryDayEditForm;
