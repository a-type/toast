import React, { FC, forwardRef } from 'react';
import {
  Dialog,
  makeStyles,
  Box,
  IconButton,
  Typography,
  Slide,
  useMediaQuery,
  Theme,
  DialogTitle,
} from '@material-ui/core';
import { CloseTwoTone } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { useTheme, ThemeProvider } from '@material-ui/styles';
import baseTheme from 'themes/baseTheme';
import { DialogProps } from '@material-ui/core/Dialog';

export interface PopupProps extends DialogProps {
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
  const { open, onClose, title, children, maxWidth = 'md', ...rest } = props;
  const classes = useStyles(props);
  const theme = useTheme<Theme>();
  const isLarge = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ThemeProvider theme={baseTheme}>
      <Dialog
        {...rest}
        fullScreen={!isLarge}
        open={!!open}
        onClose={onClose}
        TransitionComponent={Transition}
        maxWidth={maxWidth}
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            {title && (
              <Typography variant="h4" className={classes.title}>
                {title}
              </Typography>
            )}
            <IconButton onClick={onClose}>
              <CloseTwoTone />
            </IconButton>
          </Box>
        </DialogTitle>
        {children}
      </Dialog>
    </ThemeProvider>
  );
};

export default Popup;
