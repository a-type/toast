import React from 'react';
import classnames from 'classnames';

export default ({ className, ...rest }) => (
  <div className={classnames(className, 'layout-content')} {...rest} />
);
