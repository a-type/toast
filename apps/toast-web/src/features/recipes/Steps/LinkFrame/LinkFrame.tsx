import React from 'react';
import { IFrame, ScrollArea } from './components';

const enforceHttps = (src: string) => {
  if (src.startsWith('http://')) {
    return src.replace('http://', 'https://');
  }
  return src;
};

export default ({ src }: { src: string }) => (
  <ScrollArea>
    <IFrame src={enforceHttps(src)} />
  </ScrollArea>
);
