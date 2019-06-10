import React, { createContext, useState, useContext } from 'react';
import { Snackbar, Button } from '@material-ui/core';
import { pathOr, path } from 'ramda';

export type AlertDef = {
  content: string;
  timeout?: number;
  color?: 'primary' | 'secondary' | 'default';
  actions?: {
    name: string;
    onClick: () => any;
  }[];
};

export type AlertContextValue = {
  alerts: AlertDef[];

  showAlert: (alert: AlertDef) => any;
  popAlert: () => any;
};

const AlertContext = createContext<AlertContextValue>({
  alerts: [],
  showAlert: () => {},
  popAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertDef[]>([]);

  const showAlert = (alert: AlertDef) => {
    console.log('showAlert', alert);
    setAlerts([...alerts, alert]);
  };

  const popAlert = () => {
    const [_, ...rest] = alerts;
    setAlerts(rest);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts,
        showAlert,
        popAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const AlertConsumer = AlertContext.Consumer;

const buttonColorMap = {
  primary: 'default',
  secondary: 'default',
  default: 'primary',
};

export const AlertRenderer = () => {
  const alertContext = useContext(AlertContext);
  console.log(alertContext);

  const firstAlert = alertContext.alerts[0];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      color={pathOr('default', ['color'], firstAlert)}
      open={!!firstAlert}
      autoHideDuration={pathOr(30000, ['timeout'], firstAlert)}
      onClose={path(['popAlert'], alertContext)}
      message={path(['content'], firstAlert)}
      action={pathOr([], ['actions'], firstAlert).map(action => (
        <Button
          color={buttonColorMap[pathOr('default', ['color'], firstAlert)]}
          key={action.name}
          size="small"
          onClick={action.onClick}
        >
          {action.name}
        </Button>
      ))}
    />
  );
};

export const useAlerts = () => useContext(AlertContext);
