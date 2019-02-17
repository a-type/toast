import React, { SFC, useContext } from 'react';
import { Icon, Loader } from 'components/generic';
import { Button, Layer, Box } from 'grommet';
import LinkRecipeForm from './LinkRecipeForm';
import LinkerContext from 'contexts/LinkerContext';

interface LinkerProps {}

const Linker: SFC<LinkerProps> = ({}) => {
  const {
    open,
    working,
    error,
    lastResult,
    setOpen,
    setWorking,
    setError,
    setLastResult,
    reset,
  } = useContext(LinkerContext);

  const handleStarted = () => {
    setWorking(true);
    setOpen(false);
    setLastResult(null);
  };

  const handleComplete = res => {
    setWorking(false);
    setOpen(true);
    setLastResult(res);
  };

  const handleFailed = err => {
    setError(err);
    setWorking(false);
    setOpen(true);
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
          onClickOutside={() => setOpen(false)}
          onEsc={() => setOpen(false)}
        >
          <Box pad="large">
            <LinkRecipeForm
              onStarted={handleStarted}
              onComplete={handleComplete}
              onFailed={handleFailed}
              onReset={reset}
              loading={working}
              error={error}
              lastResult={lastResult}
            />
          </Box>
        </Layer>
      )}
    </div>
  );
};

export default Linker;
