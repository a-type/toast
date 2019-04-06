import React, { SFC } from 'react';
import { Icon, Loader } from 'components/generic';
import { Button, Layer, Box } from 'grommet';
import LinkRecipeForm from './LinkRecipeForm';
import { useLinker } from 'contexts/LinkerContext';

interface LinkerProps {}

const Linker: SFC<LinkerProps> = ({}) => {
  const { open, working, setOpen } = useLinker();

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
            <LinkRecipeForm />
          </Box>
        </Layer>
      )}
    </div>
  );
};

export default Linker;
