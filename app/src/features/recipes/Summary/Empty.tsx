import React, { FC } from 'react';
import { Icon, Link } from 'components/generic';
import { Box, Paragraph, Button } from 'grommet';

interface RecipeSummaryEmptyProps {}

export const RecipeSummaryEmpty: FC<RecipeSummaryEmptyProps> = ({}) => {
  return (
    <Box align="center" justify="center">
      <Icon name="playlist_add" size="20vw" color="var(--color-gray-light)" />
      <Paragraph>You haven't collected any recipes yet.</Paragraph>
      <Link to="/recipes/find">
        <Button primary label="Start your collection" />
      </Link>
    </Box>
  );
};

export default RecipeSummaryEmpty;
