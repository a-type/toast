import React, { FC, useEffect } from 'react';
import workbox from 'workbox';
import { useAlert } from 'react-alert';
import { Button } from 'grommet';

export interface UpdateCheckerProps {}

export const UpdateChecker: FC<UpdateCheckerProps> = ({}) => {
  const alert = useAlert();
  useEffect(() => {
    const handleInstalled = event => {
      if (event.isUpdate) {
        console.log('SW update: ', event);
        alert.success(
          <div>
            A new version is available.{' '}
            <Button
              primary
              label="Update"
              onClick={() => window.location.reload()}
            />
          </div>,
          {
            timeout: 0,
          },
        );
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
