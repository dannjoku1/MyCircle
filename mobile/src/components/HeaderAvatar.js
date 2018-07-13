import React, { Component } from 'react';
import styled from 'styled-components/native';
//import Touchable from '@appandflow/touchable';
import { connect } from 'react-redux';
import { connectActionSheet  } from '@expo/react-native-action-sheet';
import { withApollo } from 'react-apollo';

import Loading from './Loading';
import ButtonHeader from './ButtonHeader'
import { logout } from '../actions/user';
//import { fakeAvatar } from '../utils/constants';

const AVATAR_SIZE = 30;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`;

/*
  const Button = styled(Touchable).attrs({
    feedback: 'opacity'
  })`
    marginRight: ${props => props.side === 'right' ? 15 : 0};
    marginLeft: ${props => props.side === 'left' ? 15 : 10};
    justifyContent: center;
    alignItems: center; 
  `;
*/

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
          this.props.client.resetStore();
          return this.props.logout();
        }
      },
    );
  };

  render() { 
    const info = false;
    if (!this.props.info) {
      return (
        <ButtonHeader side="left" disabled>
          <Loading size="small"/>
        </ButtonHeader>
      );
    }
    return (
      <ButtonHeader side="left" onPress={this._onOpenActionSheet}>
        <Avatar source={{ uri: this.props.info.avatar}} />
      </ButtonHeader>
    );
  }
}

export default withApollo(connect(state => ({ info: state.user.info }), { logout })(connectActionSheet(HeaderAvatar))); 