import React from 'react';
import { Selection, Handle, Container, TipContent } from './components';
import { Tip, HelpText } from 'components/generic';

export default class SelectionEditor extends React.Component {
  state = {
    selecting: false,
    activeSelection: null,
    draggingHandleType: null,
    hypotheticalRange: null,
  };

  getSelectionRange = name => {
    const { selections, value } = this.props;
    const selection = selections.find(sel => sel.name === name);

    const start = value.indexOf(selection.text);
    return {
      start,
      end: start + selection.text.length,
    };
  };

  getTextAtRange = ({ start, end }) =>
    this.props.value.substr(start, end - start);

  handlePointerOverChar = ev => {
    const { selecting, activeSelection, draggingHandleType } = this.state;
    const { onSelectionChanged } = this.props;

    if (!selecting) {
      return;
    }

    const idx = parseInt(ev.target.getAttribute('data-char-idx'));
    const charSelection = ev.target.getAttribute('data-selection-name');

    if (!!charSelection && charSelection !== activeSelection) {
      return;
    }

    const range = this.getSelectionRange(activeSelection);

    if (draggingHandleType === 'start' && idx < range.end) {
      this.setState({ hypotheticalRange: { start: idx, end: range.end } });
    } else if (draggingHandleType === 'end' && idx > range.start) {
      this.setState({ hypotheticalRange: { start: range.start, end: idx } });
    }
  };

  handleHandleDown = ev => {
    const selectionName = ev.target.getAttribute('data-selection-name');
    const handleType = ev.target.getAttribute('data-handle-type');

    this.setState({
      selecting: true,
      draggingHandleType: handleType,
    });
  };

  handlePointerUp = () => {
    const { activeSelection, hypotheticalRange } = this.state;

    if (!this.state.selecting) {
      return;
    }

    this.setState({
      selecting: false,
      draggingHandleType: null,
      hypotheticalRange: null,
    });

    const text = this.getTextAtRange(hypotheticalRange);

    this.props.onSelectionChanged(activeSelection, text.trim());
  };

  checkCancelActiveSelection = () => {
    if (!this.state.selecting) {
      this.setState({
        selecting: false,
        draggingHandleType: null,
        activeSelection: false,
        hypotheticalRange: null,
      });
    }
  };

  chooseSelection = ev => {
    let name = ev.target.getAttribute('data-selection-name');
    if (!name) {
      name = ev.target.parentElement.getAttribute('data-selection-name');
    }
    this.setState({
      activeSelection: name,
      hypotheticalRange: this.getSelectionRange(name),
    });
  };

  renderTextChars = (offset, text, selectionName) =>
    text.split('').map((char, i) => (
      <span
        onPointerOver={this.handlePointerOverChar}
        onMouseOver={this.handlePointerOverChar}
        data-char-idx={i + offset}
        data-selection-name={selectionName}
        key={offset + i + char}
      >
        {char}
      </span>
    ));

  renderSelectionTip = () => {
    const { selecting, activeSelection, hypotheticalRange } = this.state;
    const { selections } = this.props;

    const active = selections.find(({ name }) => name === activeSelection);

    if (!active) {
      return null;
    }

    const hypotheticalText = hypotheticalRange
      ? this.getTextAtRange(hypotheticalRange)
      : active.text;

    if (selecting) {
      return <HelpText>"{hypotheticalText}"</HelpText>;
    }

    return (
      <TipContent>
        {active.tipContent}
        <HelpText>Drag the handles to change the selected text</HelpText>
      </TipContent>
    );
  };

  renderSelection = (offset, { name, text, color }) => {
    const { selecting, activeSelection } = this.state;
    const isActive = activeSelection === name;

    return (
      <Tip
        tipContent={this.renderSelectionTip()}
        disabled={!isActive}
        onBlur={this.checkCancelActiveSelection}
      >
        {({ ref }) => (
          <Selection
            key={name}
            color={color || 'brand'}
            data-selection-name={name}
            onClick={this.chooseSelection}
            innerRef={ref}
          >
            <Handle
              interactive={isActive}
              data-selection-name={name}
              data-handle-type="start"
              onPointerDown={this.handleHandleDown}
              onMouseDown={this.handleHandleDown}
              color={color || 'brand'}
              active={selecting && this.state.draggingHandleType === 'start'}
            />

            {this.renderTextChars(offset, text, name)}
            <Handle
              interactive={isActive}
              data-selection-name={name}
              data-handle-type="end"
              onPointerDown={this.handleHandleDown}
              onMouseDown={this.handleHandleDown}
              color={color || 'brand'}
              active={selecting && this.state.draggingHandleType === 'end'}
            />
          </Selection>
        )}
      </Tip>
    );
  };

  render() {
    const { value, selections } = this.props;

    let parts = [];
    let remainingText = value;
    let offset = 0;

    selections.forEach(selection => {
      let text = selection.text;
      if (
        selection.name === this.state.activeSelection &&
        this.state.hypotheticalRange
      ) {
        text = this.getTextAtRange(this.state.hypotheticalRange);
      }
      const split = remainingText.split(text);
      parts = parts.concat(this.renderTextChars(offset, split[0]));
      offset += split[0].length;
      parts.push(this.renderSelection(offset, { ...selection, text }));
      offset += text.length;
      remainingText = split[1] || '';
    });
    parts = parts.concat(this.renderTextChars(offset, remainingText));

    return (
      <Container
        onPointerUp={this.handlePointerUp}
        onMouseUp={this.handlePointerUp}
      >
        {parts}
      </Container>
    );
  }
}
