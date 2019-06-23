import React, { useState, useEffect } from 'react';
import { IFrame } from './components';
import { Box } from '@material-ui/core';

const enforceHttps = (src: string) => {
  if (src.startsWith('http://')) {
    return src.replace('http://', 'https://');
  }
  return src;
};

export default ({ src }: { src: string }) => {
  const [showHelp, setShowHelp] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowHelp(true), 5000);
  }, []);

  return (
    <Box position="relative" flexGrow={1}>
      {showHelp && (
        <div
          style={{
            width: '100%',
            position: 'absolute',
            zIndex: -1,
            bottom: 'var(--spacing-md)',
            textAlign: 'center',
          }}
        >
          <span>Not loading? Click the link icon below.</span>
        </div>
      )}
      <IFrame src={enforceHttps(src)} />
    </Box>
  );
};
