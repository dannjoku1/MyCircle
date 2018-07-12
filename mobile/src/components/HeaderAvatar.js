import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable'

import Loading from './Loading';

import { fakeAvatar } from '../utils/constants';

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`;

const Button = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  marginLeft: 15;
  justifyContent: center;
  alignItems: center; 
`;

class HeaderAvatar extends Component {
  state = { }
  render() { 
    const info = false;
    if (!info) {
      return (
        <Button disabled>
          <Avatar source={{ uri: fakeAvatar}} />
        </Button>
      );
    }
    return (
      <Button side="left" onPress={this._onOpenActionSheet}>
        <Avatar source={{ uri: fakeAvatar}} />
      </Button>
    );
  }
}

export default HeaderAvatar; 