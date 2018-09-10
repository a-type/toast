import React from 'react';
import { Link as LibLink } from 'react-router-dom';

export default ({ to, children, forceRemote, newTab, ...props }) => {
  if (!to) {
    return <span {...props}>{children}</span>;
  }

  if (/^https?:\/\//.test(to) || forceRemote) {
    return (
      <a href={to} target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return (
    <LibLink to={to} {...props} target={newTab ? '_blank' : undefined}>
      {children}
    </LibLink>
  );
};
