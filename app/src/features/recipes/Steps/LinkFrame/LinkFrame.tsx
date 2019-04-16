import React, { useState, useEffect } from 'react';
import { IFrame, ScrollArea } from './components';
import { Stack, Box, Text } from 'grommet';
import { Link } from 'components/text';

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
    <div style={{ flex: '1', position: 'relative' }}>
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
          <Text>Not loading? Click the link icon below.</Text>
        </div>
      )}
      <IFrame src={enforceHttps(src)} />
    </div>
  );
};
