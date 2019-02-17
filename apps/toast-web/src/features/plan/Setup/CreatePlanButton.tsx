import * as React from 'react';
import { Button } from 'grommet';
import CreatePlanMutation from './CreatePlanMutation';

export interface CreatePlanButtonProps {
  onCreate(): void;
}

const CreatePlanButton: React.SFC<CreatePlanButtonProps> = ({ onCreate }) => {
  return (
    <CreatePlanMutation>
      {mutate => (
        <Button
          primary
          onClick={async () => {
            await mutate();
            onCreate();
          }}
          label="Create my plan"
        />
      )}
    </CreatePlanMutation>
  );
};

export default CreatePlanButton;
