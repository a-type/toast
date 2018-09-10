import React from 'react';
import { Loader, Icon } from 'components/generic';
import { Link } from 'components/typeset';
import Foreground from 'components/generic/Foreground';
import styled from 'styled-components';

const Overlay = styled.div`
  background: var(--color-brand);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100000;

  display: flex;
  flex-direction: column;

  & > * {
    margin-left: auto;
    margin-right: auto;

    &:first-child {
      margin-top: auto;
    }

    &:last-child {
      margin-bottom: auto;
    }
  }
`;

export default class Display extends React.PureComponent {
  state = {
    created: null,
    error: null,
  };

  componentDidMount = async () => {
    try {
      const { data } = await this.props.save();
      this.setState({ created: data.linkRecipe });
      this.props.onDone(data.linkRecipe);
    } catch (err) {
      this.setState({ error: err });
      this.props.onError(err);
    }
  };

  render() {
    const { created, error } = this.state;

    if (error) {
      return (
        <Foreground>
          <Overlay>
            <Icon name="explanation-mark" size="72px" />
            <div>
              Sorry, we couldn't scan this recipe. You can still add it
              manually, though.
            </div>
          </Overlay>
        </Foreground>
      );
    }

    return (
      <Foreground>
        <Overlay>
          {created ? (
            <Link.Clear newTab to={`/recipes/${created.id}`}>
              <div>Scanned!</div>
              <div>Click below to view this recipe in Toast</div>
              <Icon name="next-step" size="72px" />
            </Link.Clear>
          ) : (
            <Loader size="72px" />
          )}
        </Overlay>
      </Foreground>
    );
  }
}
