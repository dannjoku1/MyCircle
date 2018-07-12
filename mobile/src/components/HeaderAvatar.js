import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { connect } from 'react-redux';
import { connectActionSheet  } from '@expo/react-native-action-sheet';

import Loading from './Loading';
import { logout } from '../actions/user';
//import { fakeAvatar } from '../utils/constants';

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
  _onOpenActionSheet = () => {
    const options = ['Logout', 'Cancel'];
    const destructiveButtonIndex = 0;
    this.props.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex
      }, buttonIndex => {
        if (buttonIndex === 0) {
          return this.props.logout();
        }
      },
    );
  };

  render() { 
    const info = false;
    if (!this.props.info) {
      return (
        <Button disabled>
          <Loading size="small"/>
        </Button>
      );
    }
    return (
      <Button onPress={this._onOpenActionSheet}>
        <Avatar source={{ uri: this.props.info.avatar}} />
      </Button>
    );
  }
}

export default connect(state => ({ info: state.user.info }), { logout })(connectActionSheet(HeaderAvatar)); 