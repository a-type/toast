import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

type ComposedLinkProps = NextLinkProps & HTMLAttributes<HTMLAnchorElement>;

const useStyles = makeStyles(theme => ({
  a: {
    // arg!
    '&&&': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
}));

const NextComposed = React.forwardRef<HTMLAnchorElement, ComposedLinkProps>(
  function NextComposed(props, ref) {
    const classes = useStyles(props);
    const { as, href, prefetch, ...other } = props;

    if (href && href.toString().startsWith('mailto:')) {
      return (
        <a
          ref={ref}
          {...other}
          href={href as string}
          className={clsx(classes.a, other.className)}
        />
      );
    }

    return (
      <NextLink href={href} prefetch={prefetch} as={as}>
        <a ref={ref} {...other} className={clsx(classes.a, other.className)} />
      </NextLink>
    );
  },
);

export type LinkProps = {
  activeClassName?: string;
  className?: string;
  naked?: boolean;
  to?: string;
  as?: string;
  [key: string]: any;
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
export default React.forwardRef<any, LinkProps>((props, ref) => {
  const {
    activeClassName = 'active',
    className: classNameProps,
    naked,
    to,
    as,
    newTab,
    ...other
  } = props;
  const router = useRouter();

  const className = clsx(classNameProps, {
    [activeClassName]:
      router && router.pathname === props.to && activeClassName,
  });

  const newTabProps = newTab
    ? {
        target: '_blank',
        rel: 'noopener',
      }
    : {};

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={ref}
        href={to}
        as={as}
        {...newTabProps}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={ref}
      href={to}
      as={as}
      {...newTabProps}
      {...other}
    />
  );
});
