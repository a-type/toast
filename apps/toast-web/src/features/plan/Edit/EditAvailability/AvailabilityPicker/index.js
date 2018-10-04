import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import Button from './Button';
import Options from './Options';
import { Foreground } from 'components/generic';
import OutsideClickHandler from 'react-outside-click-handler';

export default class AvailabilityPicker extends React.Component {
  state = {
    showPicker: false,
  };

  toggle = () =>
    this.setState(({ showPicker }) => ({ showPicker: !showPicker }));

  handleChange = async availability => {
    await this.props.onChange(availability);
    this.setState({ showPicker: false });
  };

  render() {
    const { value, onChange } = this.props;
    const { showPicker } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <Button
              innerRef={ref}
              active={showPicker}
              onClick={this.toggle}
              value={showPicker ? null : value}
            />
          )}
        </Reference>
        {showPicker && (
          <Popper placement="top" positionFixed>
            {({ ref, style, placement, arrowProps }) => (
              <Foreground>
                <OutsideClickHandler
                  onOutsideClick={this.toggle}
                  useCapture={false}
                  display="block"
                >
                  <Options
                    innerRef={ref}
                    style={style}
                    data-placement={placement}
                    onChange={this.handleChange}
                    value={value}
                  />
                </OutsideClickHandler>
              </Foreground>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}
