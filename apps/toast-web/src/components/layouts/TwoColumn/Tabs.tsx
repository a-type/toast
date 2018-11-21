import * as React from 'react';
import styled from 'styled-components';
import Controls from '../Controls';
import Button, { ButtonProps } from 'components/generic/Button';

const Tab = styled<ButtonProps>(Button)`
  &:disabled {
    color: var(--color-dark);
    border-color: transparent;
    opacity: 1;
    background: var(--color-white);
  }
`;

export interface TabsProps {
  tabNames: string[];
  activeTab: string;
  onTabChange(tabName: string, tabIndex: number): void;
}

const Tabs: React.SFC<TabsProps> = ({ tabNames, activeTab, onTabChange }) => (
  <Controls data-grid-area="tabs">
    <Button.Group>
      {tabNames.map((name, index) => (
        <Tab
          key={name}
          disabled={activeTab === name}
          onClick={() => onTabChange(name, index)}
        >
          {name}
        </Tab>
      ))}
    </Button.Group>
  </Controls>
);

export default Tabs;
