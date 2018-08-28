import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  & > label {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & + & {
    & > label {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const Input = styled.input`
  display: hidden;
  width: 0;

  & + label {
    padding: var(--spacing-sm);
    border: 1px solid var(--color-brand);
    color: var(--color-brand);
    border-radius: 4px;
    cursor: pointer;
  }

  &:checked + label {
    color: var(--color-dark);
    border-color: transparent;
    background-color: transparent;
  }
`;

export default class RadioButton extends React.PureComponent {
  id = `${Math.floor(Math.random() * 1000000)}`;

  render() {
    const { children, ...rest } = this.props;
    return (
      <Container>
        <Input {...rest} id={rest.id || this.id} type="radio" />
        <label htmlFor={rest.id || this.id}>{children}</label>
      </Container>
    );
  }
}
