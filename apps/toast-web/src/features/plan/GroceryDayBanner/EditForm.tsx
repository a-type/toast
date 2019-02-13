import * as React from 'react';
import { cold } from 'react-hot-loader';
import { Formik } from 'formik';
import SetGroceryDayMutation from './SetGroceryDayMutation';
import styled from 'styled-components';
import { Field, Select, Button } from 'components/generic';
import { Day } from 'types/Day';

const HorizontalForm = styled('form')`
  display: flex;
  flex-direction: row;

  & > * {
    margin-top: auto;
  }
`;

export interface GroceryDayEditFormProps {
  groceryDay: number;
  onSaved(): void;
}

const GroceryDayEditForm: React.SFC<GroceryDayEditFormProps> = ({
  groceryDay,
  onSaved,
}) => {
  return (
    <SetGroceryDayMutation>
      {mutate => (
        <Formik<{}, { groceryDay: string }>
          initialValues={{ groceryDay: `${groceryDay}` }}
          enableReinitialize
          onSubmit={async values => {
            await mutate({
              variables: {
                groceryDay: parseInt(values.groceryDay),
              },
            });
            onSaved();
          }}
        >
          {({ values, handleSubmit, handleChange }) => (
            <HorizontalForm onSubmit={handleSubmit}>
              <Field>
                <Select
                  name="groceryDay"
                  value={values.groceryDay}
                  onChange={handleChange}
                >
                  {new Array(7).fill(null).map((_, dayIndex) => (
                    <option value={dayIndex} key={dayIndex}>
                      {Day[dayIndex]}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field>
                <Button type="submit" primary label="Save" />
              </Field>
            </HorizontalForm>
          )}
        </Formik>
      )}
    </SetGroceryDayMutation>
  );
};

export default cold(GroceryDayEditForm);
