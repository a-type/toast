import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { IsLoggedIn } from 'features/auth/gates';
import { focusShadow } from 'components/effects';
import classNames from 'classnames';

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props =>
    props.liked ? 'var(--color-negative)' : 'var(--color-gray)'};
  padding: 0;
  font-size: 24px;
  transition: 0.2s ease all;
  position: relative;

  &:hover {
    color: ${props =>
      props.liked ? 'var(--color-gray)' : 'var(--color-negative-light)'};
  }

  &:focus {
    outline: none;
    color: ${props =>
      props.liked ? 'var(--color-negative)' : 'var(--color-gray)'};

    & > span.echo {
      font-size: ${props => (props.liked ? '34px' : '24px')};
      opacity: 1;
    }
  }

  & > span {
    position: relative;
    z-index: 1;
  }

  & > span.echo {
    color: var(--color-negative-light);
    font-size: 20px;
    opacity: 0;
    position: absolute;
    z-index: 0;
    left: 50%;
    top: 50%;
    transition: 0.2s ease font-size, 0.2s ease opacity;
    transform: translate(-50%, -50%);
  }
`;

const fragments = {
  Recipe: gql`
    fragment LikeButton on Recipe {
      id
      yourLike {
        id
        likedAt
      }
    }
  `,
};

const LikeRecipe = gql`
  mutation LikeRecipe($id: ID!) {
    likeRecipe(id: $id) {
      ...LikeButton
    }
  }
  ${fragments.Recipe}
`;

const UnlikeRecipe = gql`
  mutation UnlikeRecipe($id: ID!) {
    unlikeRecipe(id: $id) {
      ...LikeButton
    }
  }
  ${fragments.Recipe}
`;

const LikeButton = ({ recipe }) => (
  <IsLoggedIn>
    <Mutation
      mutation={recipe.yourLike ? UnlikeRecipe : LikeRecipe}
      variables={{ id: recipe.id }}
    >
      {mutate => (
        <Button onClick={mutate} liked={!!recipe.yourLike}>
          <span className={classNames('icons8-heart', 'echo')} />
          <span
            className={
              recipe.yourLike ? 'icons8-heart' : 'icons8-heart-outline'
            }
          />
        </Button>
      )}
    </Mutation>
  </IsLoggedIn>
);

LikeButton.fragments = fragments;

export default LikeButton;
