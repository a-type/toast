import React, { FC } from 'react';
import useGuides from 'hooks/features/useGuides';
import GuideMessage from './GuideMessage';
import { Box } from '@material-ui/core';

interface GuidesProps {
  gridArea: string;
}

export const Guides: FC<GuidesProps> = ({ gridArea, ...props }) => {
  const [guide, { dismissGuide }] = useGuides();

  if (!guide) {
    return null;
  }

  const onDismiss = () => dismissGuide(guide.name);

  return (
    <Box {...props} style={{ gridArea }}>
      <GuideMessage guide={guide} dismiss={onDismiss} />
    </Box>
  );
};

export default Guides;
