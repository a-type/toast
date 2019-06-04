import React, { FC, useState } from 'react';
import { Icon } from 'components/generic';
import { Button, Paragraph, Box, DropButton, Text } from 'grommet';
import { HelpText } from 'components/text';
import {
  IngredientCorrectionForm,
  IngredientCorrectionFormMessages,
} from './CorrectionForm';
import { toDisplay } from 'formatters/quantity';
import {
  IngredientCorrectorIngredient,
  IngredientCorrectedFieldsInput,
} from 'features/recipes/Correct/types';

export type IngredientCorrectorMessages = IngredientCorrectionFormMessages & {
  correctionSubmitted: string;
  suggestChange: string;
  suggestDelete: string;
};

interface IngredientCorrectorProps {
  recipeIngredient: IngredientCorrectorIngredient;
  submit(id: string, correction: IngredientCorrectedFieldsInput): void;
  requestDelete(id: string): void;
  messages?: IngredientCorrectorMessages;
}

export const DEFAULT_MESSAGES: IngredientCorrectorMessages = {
  submitCorrection: 'Submit correction',
  correctionSubmitted: 'Correction submitted',
  suggestChange: 'Suggest change',
  suggestDelete: 'Suggest delete',
};

const IngredientCorrector: FC<IngredientCorrectorProps> = ({
  recipeIngredient,
  submit,
  requestDelete,
  messages = DEFAULT_MESSAGES,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!showForm) {
    return (
      <Box direction="row" width="100%" margin={{ bottom: 'medium' }}>
        <Box flex="grow" alignContent="stretch">
          <Paragraph margin={{ top: '0', bottom: 'small' }}>
            {recipeIngredient.text}
          </Paragraph>
          <Paragraph margin={{ top: '0', bottom: 'small' }}>
            <HelpText>
              Quantity: {toDisplay(recipeIngredient.quantity)}, Unit:{' '}
              {recipeIngredient.unit || (
                <Text color="status-warning">None</Text>
              )}
              , Ingredient:{' '}
              {recipeIngredient.food ? (
                recipeIngredient.food.name
              ) : (
                <Text color="status-error">Unknown</Text>
              )}
            </HelpText>
          </Paragraph>
        </Box>
        <Box justify="center">
          {hasSubmitted ? (
            <HelpText>{messages.correctionSubmitted}</HelpText>
          ) : (
            <DropButton
              icon={<Icon name="more_vert" />}
              dropAlign={{ right: 'right', top: 'top' }}
              dropContent={
                <Box pad="medium" round background="white">
                  <Button
                    label={messages.suggestChange}
                    onClick={() => setShowForm(true)}
                    margin={{ bottom: 'small' }}
                  />
                  <Button
                    color="status-critical"
                    onClick={async () => {
                      await requestDelete(recipeIngredient.id);
                      setHasSubmitted(true);
                    }}
                    label={messages.suggestDelete}
                  />
                </Box>
              }
            />
          )}
        </Box>
      </Box>
    );
  }

  const handleSubmit = (values: IngredientCorrectorIngredient) => {
    submit(recipeIngredient.id, {
      unit: values.unit,
      quantity: values.quantity,
      foodId: values.food.id,
      unitStart: values.unitStart,
      unitEnd: values.unitEnd,
      quantityStart: values.quantityStart,
      quantityEnd: values.quantityEnd,
      foodStart: values.foodStart,
      foodEnd: values.foodEnd,
      text: values.text,
    });
  };

  return (
    <IngredientCorrectionForm
      initialValue={recipeIngredient}
      onSubmit={async data => {
        await handleSubmit(data);
        setShowForm(false);
        setHasSubmitted(true);
      }}
      onCancel={() => setShowForm(false)}
      messages={{
        submitCorrection: messages.submitCorrection,
      }}
    />
  );
};

export default IngredientCorrector;
