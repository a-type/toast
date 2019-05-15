import React, { FC } from 'react';
import { Switch, Route } from 'react-router';
import ExplorePage from './Explore';
import ScanRecipePage from './ScanRecipe';

export interface ExplorePagesProps {}

export const ExplorePages: FC<ExplorePagesProps> = ({}) => {
  return (
    <Switch>
      <Route path="/explore/scan" exact component={ScanRecipePage} />
      <Route path="/explore" exact component={ExplorePage} />
    </Switch>
  );
};

export default ExplorePages;
