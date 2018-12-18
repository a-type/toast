import * as React from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'components/generic';

const ButtonStyle = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

interface RemoveButtonProps {
  onClick(ev: React.MouseEvent<HTMLButtonElement>): void;
}

const RemoveButton: React.SFC<RemoveButtonProps> = ({ onClick }) => (
  <ButtonStyle onClick={onClick}>
    <Icon name="delete-button" />
  </ButtonStyle>
);

export default RemoveButton;
