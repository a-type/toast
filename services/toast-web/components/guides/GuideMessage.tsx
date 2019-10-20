import {
  Box,
  Collapse,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { DoneTwoTone, ExpandMoreTwoTone } from '@material-ui/icons';
import Link from 'components/generic/Link';
import React, { FC, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Guide } from 'systems/guides/types';

interface GuideMessageProps {
  guide: Guide;
  dismiss(): void;
}

const useStyles = makeStyles(theme => ({
  messageBox: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: 'relative',

    '&::before': {
      content: '"Tip"',
      position: 'absolute',
      bottom: '100%',
      left: '-1px',
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontStyle: 'italic',
      borderTopRightRadius: theme.shape.borderRadius,
      padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
      borderTop: `1px solid ${theme.palette.primary.dark}`,
      borderRight: `1px solid ${theme.palette.primary.dark}`,
    },

    '& > *:first-child': {
      flexGrow: 1,
    },
  },

  actionLink: {
    background: theme.palette.background.paper,
    color: theme.palette.secondary.dark,
    borderTop: '1px solid ' + theme.palette.secondary.main,
    textAlign: 'center',
    fontStyle: 'italic',
    display: 'flex',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },

    '& > *': {
      margin: 'auto',
    },
  },

  primaryActionLink: {
    background: theme.palette.secondary.main,
    color: theme.palette.grey[50],
    borderTop: '1px solid ' + theme.palette.secondary.main,
    textAlign: 'center',
    fontStyle: 'italic',
    display: 'flex',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },

    '& > *': {
      margin: 'auto',
    },
  },

  expander: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },

  summaryRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',

    '& > *': {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  },
}));

export const GuideMessage: FC<GuideMessageProps & RouteComponentProps> = ({
  guide,
  dismiss,
  location,
}) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles({});

  const path = location.pathname;
  const isOnPage = guide.page === path;
  const content = isOnPage ? (
    <Box p={1} flexGrow={1} display="flex" flexDirection="column">
      <Box className={classes.summaryRow}>
        <IconButton
          className={classes.expander}
          onClick={() => setExpanded(!expanded)}
        >
          <ExpandMoreTwoTone
            style={{ transform: !expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </IconButton>
        <Typography variant="h6">{guide.summary}</Typography>
      </Box>
      <Collapse in={expanded}>
        <Box p={2}>
          <Typography variant="body1">{guide.text}</Typography>
        </Box>
      </Collapse>
    </Box>
  ) : (
    <Link to={guide.page} className={classes.primaryActionLink}>
      <Box className={classes.summaryRow}>
        <Typography variant="h6">{guide.action}</Typography>
        <ExpandMoreTwoTone style={{ transform: 'rotate(270deg)' }} />
      </Box>
    </Link>
  );

  return (
    <Box
      className={classes.messageBox}
      display="flex"
      flexDirection="row"
      alignItems="stretch"
    >
      {content}
      <Link
        onClick={dismiss}
        className={isOnPage ? classes.primaryActionLink : classes.actionLink}
      >
        <DoneTwoTone />
      </Link>
    </Box>
  );
};

export default withRouter(GuideMessage);