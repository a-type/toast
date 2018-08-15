// @flow
import React from 'react';
import Layout from './Layout';
import { P, Link, H1 } from 'components/generic';
import { type Recipe } from 'types';

export default ({ recipe }: { recipe: Recipe }) => {
  if (!recipe) {
    return null;
  }

  const { author, description, title } = recipe;

  return (
    <Layout>
      <H1>{title}</H1>
      <P>
        by <Link to={`/users/${author.id}`}>{author.name || 'Anonymous'}</Link>
      </P>
      <P>{description || 'No description'}</P>
    </Layout>
  );
};
