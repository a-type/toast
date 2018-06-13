// @flow
import React from 'react';
import { Consumer, type SearchContext } from '../context';
import Layout from './Layout';
import Card from 'components/recipes/Card';
import { Loader } from 'components/generic';
import Empty from './Empty';

export default () => (
  <Consumer>
    {({ state: { results, loading, term } }: SearchContext) => {
      if (loading) {
        return <Loader size="80px" />;
      }

      if (results && term.length > 2 && results.length === 0) {
        return <Empty />;
      }

      return (
        <Layout>
          {results.map(recipe => <Card key={recipe.id} recipe={recipe} />)}
        </Layout>
      );
    }}
  </Consumer>
);
