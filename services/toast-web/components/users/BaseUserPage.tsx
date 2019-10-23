import React, { FC, ReactElement, useCallback } from 'react';
import { makeStyles, Theme, Container, Paper } from '@material-ui/core';
import { User } from 'hooks/features/fragments';

export interface BaseUserPageProps {
  user: User;
  renderAvatar: (props: any) => ReactElement;
  renderDisplayName: (props: any) => ReactElement;
  renderBio: (props: any) => ReactElement;
  renderCoverImage: (props: any) => ReactElement;
  children: (props: any) => ReactElement;
}

const useBaseUserPageStyles = makeStyles<Theme, BaseUserPageProps>(theme => ({
  coverImage: {
    width: '100%',
    height: '240px',
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '100%',
    position: 'absolute',
    top: '0',
    transform: 'translateY(-50%)',
    border: `6px solid ${theme.palette.background.paper}`,

    [theme.breakpoints.up('lg')]: {
      right: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
    paddingTop: `calc(${theme.spacing(2)}px + 60px)`,
    position: 'relative',
    display: 'grid',
    gridTemplateAreas: '"info" "content"',

    [theme.breakpoints.up('lg')]: {
      gridTemplateAreas: '"content info"',
      gridTemplateColumns: '2fr auto',
      paddingTop: theme.spacing(2),
    },
  },
  displayName: {
    fontSize: theme.typography.h2.fontSize,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      maxWidth: '260px',
    },
  },
  bio: {
    marginBottom: theme.spacing(3),
  },
  infoSection: {
    gridArea: 'info',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '400px',
    },
  },
  contentSection: {
    gridArea: 'content',
  },
}));

export const BaseUserPage: FC<BaseUserPageProps> = props => {
  const classes = useBaseUserPageStyles(props);
  const {
    user,
    renderAvatar,
    renderDisplayName,
    renderBio,
    renderCoverImage,
    children,
  } = props;

  if (!user) {
    return null;
  }

  return (
    <Container>
      {renderCoverImage({ className: classes.coverImage })}
      <Paper className={classes.paper}>
        <section className={classes.infoSection}>
          {renderAvatar({ className: classes.avatar })}
          {renderDisplayName({ className: classes.displayName })}
          {renderBio({ className: classes.bio })}
        </section>
        <section className={classes.contentSection}>{children({})}</section>
      </Paper>
    </Container>
  );
};
