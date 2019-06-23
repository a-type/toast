import * as React from 'react';
import { Bar } from './components';
import { IconButton, Typography, Box, makeStyles } from '@material-ui/core';
import Link from 'components/generic/Link';
import { ArrowBackIosTwoTone, LinkTwoTone } from '@material-ui/icons';

export interface ToolbarProps {
  recipe: {
    id: string;
    title: string;
    sourceUrl: string;
  };
}

const useStyles = makeStyles(theme => ({
  bar: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const Toolbar: React.SFC<ToolbarProps> = ({ recipe }) => {
  const classes = useStyles({});

  return (
    <Box className={classes.bar}>
      <Link to={`/recipes/${recipe.id}`}>
        <IconButton>
          <ArrowBackIosTwoTone />
        </IconButton>
      </Link>
      <Box flexGrow={1} ml={2}>
        <Typography>Cooking</Typography>
        <Typography css={{ margin: '0' }} variant="h3">
          {recipe.title}
        </Typography>
      </Box>
      {/* <div>
        <Button.Icon name="index" />
      </div> */}
      <Box>
        <Link to={recipe.sourceUrl} newTab>
          <IconButton>
            <LinkTwoTone />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Toolbar;