import React from 'react';
import { Link } from 'components/generic';
import { Heading, Paragraph, Button } from 'grommet';

export default () => (
  <div>
    <Heading>Bring order to your week</Heading>
    <Paragraph>
      Start planning your daily meals in advance the easy way.
    </Paragraph>
    <Paragraph>
      <Link to="/plan/edit">
        <Button primary label="Get started" />
      </Link>
    </Paragraph>
    <Heading level="2">All of the Internet's Recipes</Heading>
    <Paragraph>
      Bring all your favorites. We make it easy to scan recipes from across the
      web and add them to your plan.
    </Paragraph>
    <Heading level="2">Instantly Fit Your Schedule with Toast Gold</Heading>
    <Paragraph>
      Upgrade your account to make planning even easier with an AI-driven
      schedule.
    </Paragraph>
  </div>
);
