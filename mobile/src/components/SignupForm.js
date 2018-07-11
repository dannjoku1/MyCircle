import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fakeAvatar } from '../utils/constants';

const Root = styled(Touchable).attrs({
    feedback: 'none',
  })`
    flex: 1;
    position: relative;
    justifyContent: center;
    alignItems: center;
  `;

const T = styled.Text``;

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 5%;
  left: 5%
`

class SignupForm extends Component {
  state = { }
  render() {
    return (
      <Root>
        <BackButton onPress={this.props._onBackPress}>
          <MaterialIcons color={colors.WHITE} size={30} name="arrow-back"/>
        </BackButton>
      </Root>
    );
  }
}

export default SignupForm

