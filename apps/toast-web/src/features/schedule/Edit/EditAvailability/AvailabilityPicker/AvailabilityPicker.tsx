import * as React from 'react';
import { focusShadow } from 'components/effects';
import { getColor, getForeground, getLabel } from '../../common';
import styled from 'styled-components';
import { Loader } from 'components/generic';
import Icon from './Icon';
import Caret from './Caret';

const BaseSelect = styled.select`
  background: transparent;
  font-family: var(--font-default);
  font-size: var(--font-size-md);
  color: var(--color-black);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: 0;
  display: block;
  cursor: pointer;
  width: 100%;
  height: 100%;
  opacity: 0;

  &:focus {
    outline: none;
    box-shadow: ${focusShadow.default};
  }
`;

const Wrapper = styled<{ value: string }, 'div'>('div')`
  background: ${props => getColor(props.value)};
  color: ${props => getForeground(props.value)};
  border-radius: var(--border-radius-md);
  position: relative;
  height: 10vh;
  flex: 1;

  & > *:first-child {
    position: absolute;
    top: 50%;
    left: var(--spacing-md);
    transform: translateY(-50%);
  }

  & > ${Caret} {
    position: absolute;
    right: var(--spacing-md);
    top: calc(50% + 4px);
    transform: translateY(-50%);
  }
`;

export interface AvailabilityPickerProps {
  value: string;
  onChange(value: string): Promise<any>;
}

export default class AvailabilityPicker extends React.Component<
  AvailabilityPickerProps
> {
  state = {
    loading: false,
  };

  handleChange = async ev => {
    this.setState({ loading: true });
    await this.props.onChange(ev.target.value);
    this.setState({ loading: false });
  };

  render() {
    const { value, onChange, ...rest } = this.props;
    const { loading } = this.state;

    return (
      <Wrapper value={value} {...rest}>
        {loading ? <Loader size="24px" /> : <Icon value={value} />}
        <Caret value={value} />
        <BaseSelect value={value} onChange={this.handleChange}>
          {['SKIP', 'EAT_OUT', 'NONE', 'SHORT', 'MEDIUM', 'LONG'].map(val => (
            <option value={val} key={val}>
              {getLabel(val)}
            </option>
          ))}
        </BaseSelect>
      </Wrapper>
    );
  }
}
