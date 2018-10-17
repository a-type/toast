import React from 'react';
import { SingleColumn } from 'components/layouts';
import { Edit, View } from 'features/plan';
import { Switch, Route, Redirect } from 'react-router-dom';
import { path } from 'ramda';

const parseIntOrNil = maybeInt => {
  if (maybeInt !== undefined) {
    return parseInt(maybeInt);
  }
  return maybeInt;
};

export default () => (
  <SingleColumn>
    <Switch>
      <Route path="/plan/edit" component={Edit} />
      <Route
        path="/plan/:weekIndex?/:dayIndex?"
        render={({ match }) => (
          <View
            weekIndex={parseIntOrNil(path(['params', 'weekIndex'], match))}
            dayIndex={parseIntOrNil(path(['params', 'dayIndex'], match))}
          />
        )}
      />
    </Switch>
  </SingleColumn>
);
