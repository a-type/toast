import React from 'react';
import { Loader } from 'components/generic';

export default class Display extends React.PureComponent {
  componentDidMount = async () => {
    try {
      const { data } = await this.props.save();
      this.props.onDone(data.linkRecipe);
    } catch (err) {
      this.props.onError(err);
    }
  };

  render() {
    return <Loader size="72px" />;
  }
}
