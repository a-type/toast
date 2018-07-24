// @flow
import React, { type Node } from 'react';
import Header from './Header';
import Details from './Content/Details';
import Ingredients from './Content/Ingredients';
import Steps from './Content/Steps';
import Grid from './Grid';
import Skeleton from './Skeleton';
import Page from './Page';
import JumpControls from './JumpControls';

export type Props = {
  loading: boolean,
  children: Node,
};

export default class RecipeLayout extends React.PureComponent<Props> {
  static defaultProps = {
    loading: false,
  };

  static Header = Header;
  static Details = Details;
  static Ingredients = Ingredients;
  static Steps = Steps;
  static JumpControls = JumpControls;

  render() {
    const { loading, children } = this.props;

    if (loading) {
      return (
        <Grid>
          <Skeleton />
        </Grid>
      );
    }

    return (
      <Grid>
        <Page />
        {children}
      </Grid>
    );
  }
}
