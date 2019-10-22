import React, { FC, useCallback, useEffect } from 'react';
import { makeStyles, Theme, Button, CircularProgress } from '@material-ui/core';
import { useFollow } from 'hooks/features/useFollow';
import { useUnfollow } from 'hooks/features/useUnfollow';
import { ButtonProps } from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

export interface FollowButtonProps extends ButtonProps {
  user: {
    id: string;
    viewerFollowing: boolean;
  };
}

const useStyles = makeStyles<Theme, FollowButtonProps>(theme => ({}));

export const FollowButton: FC<FollowButtonProps> = props => {
  const classes = useStyles(props);
  const { user } = props;

  const [follow, followResult] = useFollow({
    variables: { input: { userId: user.id } },
  });
  const [unfollow, unfollowResult] = useUnfollow({
    variables: { input: { userId: user.id } },
  });

  const handleClick = useCallback(async () => {
    if (user.viewerFollowing) {
      await unfollow();
    } else {
      await follow();
    }
  }, [user, follow, unfollow]);

  const error = followResult.error || unfollowResult.error;
  const loading = followResult.loading || unfollowResult.loading;

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      console.error(error);
      enqueueSnackbar('Failed to follow that user, please try again.');
    }
  }, [error]);

  return (
    <Button
      color={user.viewerFollowing ? 'default' : 'primary'}
      variant="contained"
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <CircularProgress
          color="inherit"
          size={14}
          style={{ marginRight: '8px' }}
        />
      )}
      {user.viewerFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
