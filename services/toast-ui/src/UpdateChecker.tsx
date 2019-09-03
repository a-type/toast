import React, { FC, useEffect } from 'react';
import workbox from 'workbox';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';

export interface UpdateCheckerProps {}

export const UpdateChecker: FC<UpdateCheckerProps> = ({}) => {
  const snackbars = useSnackbar();

  useEffect(() => {
    const handleInstalled = event => {
      if (event.isUpdate) {
        console.log('SW update: ', event);
        snackbars.enqueueSnackbar('A new version is available.', {
          action: (
            <Button onClick={() => window.location.reload()}>Update</Button>
          ),
        });
      }
    };
    if (workbox) {
      workbox.addEventListener('installed', handleInstalled);
      return () => workbox.removeEventListener('installed', handleInstalled);
    } else {
      return () => {};
    }
  }, []);

  return null;
};

export default UpdateChecker;
