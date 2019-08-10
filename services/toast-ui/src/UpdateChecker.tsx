import React, { FC, useEffect } from 'react';
import workbox from 'workbox';
import { useAlerts } from 'contexts/AlertContext';

export interface UpdateCheckerProps {}

export const UpdateChecker: FC<UpdateCheckerProps> = ({}) => {
  const alerts = useAlerts();

  useEffect(() => {
    const handleInstalled = event => {
      if (event.isUpdate) {
        console.log('SW update: ', event);
        alerts.showAlert({
          content: 'A new version is available.',
          actions: [
            {
              name: 'Update',
              onClick: () => window.location.reload(),
            },
          ],
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
