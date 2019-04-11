import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from './Card';
import { Box } from 'grommet';
// @ts-ignore
import demoImage from './__stories__/image.jpg';
import { CardShape } from './types';

const DemoCard = ({ noImage }: { noImage?: boolean }) => (
  <Card
    imageSrc={!noImage && demoImage}
    title="Toast"
    shape={CardShape.Large}
    actions={[
      {
        name: 'Save',
        icon: 'plus-math',
        onSelected() {},
      },
      {
        name: 'Explore',
        onSelected() {},
      },
      {
        name: 'More',
        onSelected() {},
      },
    ]}
    renderBadge={() => 'Badge!'}
  >
    Toast is a classic recipe of an unknown origin.
  </Card>
);

storiesOf('Card', module)
  .add('sizes', () => (
    <Box>
      <Box width="400px" height="400px" pad="large">
        <DemoCard />
      </Box>
      <Box width="400px" height="250px" pad="large">
        <DemoCard />
      </Box>
      <Box width="250px" height="250px" pad="large">
        <DemoCard />
      </Box>
    </Box>
  ))
  .add('no image', () => (
    <Box>
      <Box width="400px" height="400px" pad="large">
        <DemoCard noImage />
      </Box>
      <Box width="400px" height="250px" pad="large">
        <DemoCard noImage />
      </Box>
      <Box width="250px" height="250px" pad="large">
        <DemoCard noImage />
      </Box>
    </Box>
  ));
