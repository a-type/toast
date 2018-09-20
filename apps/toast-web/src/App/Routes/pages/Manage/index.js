import React from 'react';
import { HasScope } from 'features/auth/gates';
import { Recent } from 'features/ingredients/manage';
import { Content, SingleColumn } from 'components/layouts';

export default class ManagePage extends React.Component {
  render() {
    return (
      <SingleColumn>
        <Content>
          <HasScope scope="ui:manage">
            <Recent />
          </HasScope>
        </Content>
      </SingleColumn>
    );
  }
}
