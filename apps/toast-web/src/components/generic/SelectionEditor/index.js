import React from 'react';
import { Selection, Handle, Container } from './components';

export default class SelectionEditor extends React.Component {
  state = {
    selecting: false,
    activeSelection: null,
    activeHandleType: null,
  };

  getSelectionRange = name => {
    const { selections, value } = this.props;
    const selection = selections.find(sel => sel.name === name);
    console.info(selection);
    console.info(name);
    console.info(selections);

    const start = value.indexOf(selection.text);
    return {
      start,
      end: start + selection.text.length,
    };
  };

  getTextAtRange = ({ start, end }) =>
    this.props.value.substr(start, end - start);

  handlePointerOverChar = ev => {
    console.info('move over char');
    const { selecting, activeSelection, activeHandleType } = this.state;
    const { onSelectionChanged } = this.props;

    if (!selecting) {
      return;
    }

    const idx = parseInt(ev.target.getAttribute('data-char-idx'));

    const range = this.getSelectionRange(activeSelection);

    if (activeHandleType === 'start' && idx < range.end) {
      const rangeText = this.getTextAtRange({ start: idx, end: range.end });
      onSelectionChanged(activeSelection, rangeText);
    } else if (activeHandleType === 'end' && idx > range.start) {
      const rangeText = this.getTextAtRange({ start: range.start, end: idx });
      onSelectionChanged(activeSelection, rangeText);
    }
  };

  handleHandleDown = ev => {
    console.info('handle down');
    const selectionName = ev.target.getAttribute('data-selection-name');
    const handleType = ev.target.getAttribute('data-handle-type');

    this.setState({
      selecting: true,
      activeSelection: selectionName,
      activeHandleType: handleType,
    });
  };

  handlePointerUp = () => {
    console.info('pointer up');
    this.setState({
      selecting: false,
      activeSelection: null,
      activeHandleType: null,
    });
  };

  renderTextChars = (offset, text) =>
    text.split('').map((char, i) => (
      <span
        onPointerOver={this.handlePointerOverChar}
        onMouseOver={this.handlePointerOverChar}
        data-char-idx={i + offset}
        key={offset + i + char}
      >
        {char}
      </span>
    ));

  renderSelection = (offset, selectionName, text) => (
    <Selection key={selectionName}>
      <Handle
        data-selection-name={selectionName}
        data-handle-type="start"
        onPointerDown={this.handleHandleDown}
        onMouseDown={this.handleHandleDown}
      />
      {this.renderTextChars(offset, text)}
      <Handle
        data-selection-name={selectionName}
        data-handle-type="end"
        onPointerDown={this.handleHandleDown}
        onMouseDown={this.handleHandleDown}
      />
    </Selection>
  );

  render() {
    const { value, selections } = this.props;
    console.info(this.props);

    let parts = [];
    let remainingText = value;
    let offset = 0;

    selections.forEach(selection => {
      const split = remainingText.split(selection.text);
      parts = parts.concat(this.renderTextChars(offset, split[0]));
      offset += split[0].length;
      parts.push(this.renderSelection(offset, selection.name, selection.text));
      offset += selection.text.length;
      remainingText = split[1];
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
