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
                  {...{ name: 'groceryDay' } as any}
                  value={values.groceryDay}
                  valueKey="value"
                  onChange={handleChange}
                  options={new Array(7).fill(null).map((_, dayIndex) => ({
                    value: dayIndex,
                    label: Day[dayIndex],
                  }))}
                  valueLabel={Day[values.groceryDay]}
                >
                  {option => option.label}
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

export default GroceryDayEditForm;
