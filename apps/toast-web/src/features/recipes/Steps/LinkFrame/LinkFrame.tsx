import React from 'react';
import { IFrame, ScrollArea } from './components';

export default ({ src }) => (
  <ScrollArea>
    <IFrame src={src} />
  </ScrollArea>
);
