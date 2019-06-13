import { Button, Snackbar } from '@material-ui/core';
import { path, pathOr } from 'ramda';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

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

  const showAlert = useCallback(
    (alert: AlertDef) => {
      console.log('showAlert', alert);
      setAlerts([...alerts, alert]);
    },
    [setAlerts, alerts],
  );

  const popAlert = useCallback(() => {
    const [_, ...rest] = alerts;
    setAlerts(rest);
  }, [setAlerts, alerts]);

  const value = useMemo(
    () => ({
      alerts,
      showAlert,
      popAlert,
    }),
    [alerts, showAlert, popAlert],
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
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
