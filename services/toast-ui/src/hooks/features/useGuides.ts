import { useState, useEffect, useMemo } from 'react';
import { GuideName, Guide } from 'systems/guides/types';
import { getGuide } from 'systems/guides/guides';

const loadGuides = (): GuideName[] => {
  const current = localStorage.getItem('toast_guides');
  if (current) {
    return current.split(',') as GuideName[];
  }
  return [];
};

export default (): [
  Guide,
  {
    queueGuide(name: string): void;
    dismissGuide(name: string): void;
    showGuide(name: string): void;
  }
] => {
  const [activeGuides, setActiveGuides] = useState<GuideName[]>([]);
  useEffect(() => {
    setActiveGuides(loadGuides());
  });

  const queueGuide = (guideName: GuideName) => {
    if (activeGuides.includes(guideName)) {
      return;
    }
    activeGuides.push(guideName);
    localStorage.setItem('toast_guides', activeGuides.join(','));
    setActiveGuides(activeGuides);
  };

  const showGuide = (guideName: GuideName) => {
    let pushed;
    if (activeGuides.includes(guideName)) {
      pushed = [guideName, ...activeGuides.filter(n => n !== guideName)];
    } else {
      pushed = [guideName, ...activeGuides];
    }
    localStorage.setItem('toast_guides', pushed.join(','));
    setActiveGuides(pushed);
  };

  const dismissGuide = (guideName: GuideName) => {
    if (!activeGuides.includes(guideName)) {
      return;
    }
    const without = activeGuides.filter(n => n !== guideName);
    localStorage.setItem('toast_guides', without.join(','));
    setActiveGuides(without);
  };

  const highestPriority = useMemo<GuideName>(() => {
    return activeGuides[0];
  }, [activeGuides, getGuide]);

  const guide = getGuide(highestPriority);

  return [guide, { queueGuide, dismissGuide, showGuide }];
};
