import React, { SFC, Fragment, useState } from 'react';
import { Icon, Loader } from 'components/generic';
import { Button, Layer, Box } from 'grommet';
import LinkRecipeForm from './LinkRecipeForm';

interface LinkerProps {}

const Linker: SFC<LinkerProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<Error>(null);
  const close = () => setOpen(false);

  const handleStarted = () => {
    setWorking(true);
    close();
  };

  const handleComplete = () => {
    setWorking(false);
    setOpen(true);
  };

  const handleFailed = err => {
    setError(err);
    setWorking(false);
    setOpen(true);
  };

  const handleReset = () => {
    setError(null);
    setWorking(false);
    setOpen(false);
  };

  const icon = working ? <Loader size="1em" /> : <Icon name="plus-math" />;
  const label = working ? 'Scanning...' : 'Add recipe';

  return (
    <div
      style={{
        position: 'fixed',
        right: 'var(--spacing-md)',
        bottom: 'var(--spacing-md)',
      }}
    >
      <Button label={label} icon={icon} onClick={() => setOpen(!open)} />
      {open && (
        <Layer
          responsive={false}
          position="bottom-right"
          margin="medium"
          onClickOutside={close}
        >
          <Box pad="large">
            <LinkRecipeForm
              onStarted={handleStarted}
              onComplete={handleComplete}
              onFailed={handleFailed}
              onReset={handleReset}
              loading={working}
              error={error}
            />
          </Box>
        </Layer>
      )}
    </div>
  );
};

export default Linker;
