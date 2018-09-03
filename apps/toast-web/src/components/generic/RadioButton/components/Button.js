import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';

const Container = styled.div`
  & label {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & + & {
    & > label {
      border-top-right-radius: var(--border-radius-md);
      border-bottom-right-radius: var(--border-radius-md);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const Input = styled.input`
  display: block;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  border: none;
  position: absolute;
  opacity: 0;

  &:checked + label {
    color: var(--color-dark);
    border-color: transparent;
    background-color: transparent;
    cursor: default;

    &:hover,
    &:focus {
      box-shadow: none;
    }
  }
`;

const Label = Button.withComponent('label');

export default class RadioButton extends React.PureComponent {
  id = `${Math.floor(Math.random() * 1000000)}`;

  render() {
    const { children, ...rest } = this.props;
    return (
      <Container>
        <Input {...rest} id={rest.id || this.id} type="radio" />
        <Label htmlFor={rest.id || this.id}>{children}</Label>
      </Container>
    );
  }
}
