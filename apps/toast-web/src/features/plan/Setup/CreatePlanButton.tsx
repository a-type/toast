import * as React from 'react';
import { Button } from 'components/generic';
import CreatePlanMutation from './CreatePlanMutation';

export interface CreatePlanButtonProps {
  onCreate(): void;
}

const CreatePlanButton: React.SFC<CreatePlanButtonProps> = ({ onCreate }) => {
  return (
    <CreatePlanMutation>
      {mutate => (
        <Button.Positive
          onClick={async () => {
            await mutate();
            onCreate();
          }}
        >
          Create my plan
        </Button.Positive>
      )}
    </CreatePlanMutation>
  );
};

export default CreatePlanButton;
