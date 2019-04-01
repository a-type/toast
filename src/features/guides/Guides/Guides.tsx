import React, { FC } from 'react';
import useGuides from '../useGuides';
import GuideMessage from './GuideMessage';

interface GuidesProps {}

export const Guides: FC<GuidesProps> = ({}) => {
  const [guide, { dismissGuide }] = useGuides();

  if (!guide) {
    return null;
  }

  const onDismiss = () => dismissGuide(guide.name);

  return <GuideMessage guide={guide} dismiss={onDismiss} />;
};

export default Guides;
