import * as React from 'react';
import EditForm from './EditForm';
import GroceryDayEventCreator from './GroceryDayEventCreator';
import useGroceryDay from '../useGroceryDay';

const GroceryDayBanner: React.SFC<{}> = ({}) => {
  const [{ index }, loading, error] = useGroceryDay();

  if (loading || error) {
    return null;
  }

  return (
    <>
      <EditForm groceryDay={index || 0} />
      <GroceryDayEventCreator dayIndex={index || 0} />
    </>
  );
};

export default GroceryDayBanner;
