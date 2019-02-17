import * as React from 'react';
import { Formik } from 'formik';
import SetGroceryDayMutation from './SetGroceryDayMutation';
import styled from 'styled-components';
import { Field } from 'components/generic';
import { Day } from 'types/Day';
import { Button, Select } from 'grommet';

const HorizontalForm = styled.form`
  display: flex;
  flex-direction: row;

  & > * {
    margin-top: auto;

    * + & {
      margin-left: var(--spacing-md);
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
  return (
    <SetGroceryDayMutation>
      {mutate => (
        <Formik<{}, { groceryDay: { value: number; label: string } }>
          initialValues={{
            groceryDay: { value: groceryDay, label: `${Day[groceryDay]}` },
          }}
          enableReinitialize
          onSubmit={async values => {
            await mutate({
              variables: {
                groceryDay: values.groceryDay.value,
              },
            });
            onSaved();
          }}
        >
          {({ values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Field label="Grocery day" required>
                <Select
                  {...{ name: 'groceryDay' } as any}
                  value={values.groceryDay}
                  valueKey="value"
                  labelKey="label"
                  onChange={ev => setFieldValue('groceryDay', ev.option)}
                  options={new Array(7).fill(null).map((_, dayIndex) => ({
                    value: dayIndex,
                    label: Day[dayIndex],
                  }))}
                >
                  {option => option.label}
                </Select>
              </Field>
              <Field>
                <Button type="submit" primary label="Save" />
              </Field>
            </form>
          )}
        </Formik>
      )}
    </SetGroceryDayMutation>
  );
};

export default GroceryDayEditForm;
