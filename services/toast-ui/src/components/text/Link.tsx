import * as React from 'react';
import BaseLink, { LinkProps } from 'components/generic/Link';
import { Typography, Link, makeStyles } from '@material-ui/core';
import { lighten, darken, emphasize } from '@material-ui/core/styles';

export type TextLinkProps = LinkProps & {
  to?: string;
};

const ProtectedBaseLink = (props: TextLinkProps) => <BaseLink {...props} />;

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
    transition: '0.25s ease-in-out',
    display: 'inline-block',
    position: 'relative',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: '-0.5em',
      right: '-0.5em',
      top: '0',
      bottom: '0',
      borderRadius: '1em',
      background: theme.palette.primary.light,
      opacity: 0,
      transition: '0.25s ease-in-out',
    },

    '&:hover': {
      color: '#632d00',
      '&::after': {
        opacity: 0.5,
      },
    },

    '&:focus': {
      outline: 'none',
      color: '#632d00',
      '&::after': {
        opacity: 0.5,
      },
    },
  },
}));

const TextLink: React.SFC<TextLinkProps> = ({ children, to, ...props }) => {
  const classes = useStyles(props);

  return !!to ? (
    <Link
      component={ProtectedBaseLink}
      {...props}
      to={to}
      className={classes.link}
    >
      {children}
    </Link>
  ) : (
    <span {...props} className={classes.link}>
      <Typography color="textPrimary">{children}</Typography>
    </span>
  );
};

export default TextLink;
