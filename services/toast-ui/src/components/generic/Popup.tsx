import React, { FC, forwardRef } from 'react';
import {
  Dialog,
  Container,
  makeStyles,
  Box,
  IconButton,
  Typography,
  Slide,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import { CloseTwoTone } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { useTheme } from '@material-ui/styles';

export interface PopupProps {
  open: boolean;
  onClose: () => any;
  title?: string;
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
}));

const Transition = forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export const Popup: FC<PopupProps> = props => {
  const { open, onClose, title, children } = props;
  const classes = useStyles(props);
  const theme = useTheme<Theme>();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Dialog
      fullScreen={!isLarge}
      open={!!open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        pl={2}
        pr={2}
      >
        {title && (
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        )}
        <IconButton onClick={onClose}>
          <CloseTwoTone />
        </IconButton>
      </Box>
      <Container>
        <Box pt={2}>{children}</Box>
      </Container>
    </Dialog>
  );
};

export default Popup;
