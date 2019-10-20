import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink from '@material-ui/core/Link';

type ComposedLinkProps = NextLinkProps & HTMLAttributes<HTMLAnchorElement>;

const NextComposed = React.forwardRef<HTMLAnchorElement, ComposedLinkProps>(
  function NextComposed(props, ref) {
    const { as, href, prefetch, ...other } = props;

    return (
      <NextLink href={href} prefetch={prefetch} as={as}>
        <a ref={ref} {...other} />
      </NextLink>
    );
  },
);

export type LinkProps = {
  activeClassName?: string;
  className?: string;
  naked?: boolean;
  to?: string;
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
    ...other
  } = props;
  const router = useRouter();

  const className = clsx(classNameProps, {
    [activeClassName]:
      router && router.pathname === props.to && activeClassName,
  });

  if (naked) {
    return (
      <NextComposed className={className} ref={ref} href={to} {...other} />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={ref}
      href={to}
      {...other}
    />
  );
});
