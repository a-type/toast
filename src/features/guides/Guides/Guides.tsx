import React, { FC } from 'react';
import useGuides from '../useGuides';
import GuideMessage from './GuideMessage';
import { BoxProps, Box } from 'grommet';

interface GuidesProps extends BoxProps {}

export const Guides: FC<GuidesProps> = props => {
  const [guide, { dismissGuide }] = useGuides();

  if (!guide) {
    return null;
  }

  const onDismiss = () => dismissGuide(guide.name);

  return (
    <Box {...props}>
      <GuideMessage guide={guide} dismiss={onDismiss} />
    </Box>
  );
};

export default Guides;
