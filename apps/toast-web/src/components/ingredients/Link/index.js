// @flow

import React from 'react';
import Pill from 'components/generic/Pill';
import Link from 'components/generic/Link';

export default ({
  name,
  isHighlighted,
}: {
  name: string,
  isHighlighted: boolean,
}) => (
  <Link.Clear to={`/ingredients/${encodeURIComponent(name)}`}>
    <Pill.Ghost isHighlighted={isHighlighted}>
      <span style={{ textTransform: 'capitalize' }}>{name}</span>
    </Pill.Ghost>
  </Link.Clear>
);
