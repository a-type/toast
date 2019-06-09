import React, { FC } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Container,
  Theme,
  makeStyles,
} from '@material-ui/core';
import useNavState, { PathConfig } from 'hooks/useNavState';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles<Theme>(theme => ({
  tabContainer: {
    marginTop: theme.spacing(4),
  },
  paper: {
    zIndex: 1050,
  },
}));

export const NavTabs: FC<{
  paths: PathConfig[];
  tabLabels: string[];
}> = props => {
  const theme = useTheme<Theme>();
  const { index, onChange } = useNavState(props.paths);
  const classes = useStyles(props);

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Paper square className={classes.paper}>
        <Tabs value={index} onChange={onChange}>
          {props.tabLabels.map(label => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={index}
        onChangeIndex={idx => onChange(null, idx)}
        style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
        containerStyle={{ flexGrow: 1 }}
      >
        {React.Children.map(props.children, child => (
          <Container className={classes.tabContainer}>{child}</Container>
        ))}
      </SwipeableViews>
    </Box>
  );
};
