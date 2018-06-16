import React from 'react';
import { Button } from 'components/generic';

export default class Filter extends React.PureComponent {
  render() {
    const { filter } = this.props;
    return (
      <div>
        {filter.type} {filter.ingredient.name}{' '}
        <Button.Icon name="delete" onClick={filter.onRemove} />
      </div>
    );
  }
}
