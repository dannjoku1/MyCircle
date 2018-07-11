import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

const Root = styled(Touchable).attrs({
    feedback: 'none',
  })`
    flex: 1;
    position: relative;
    justifyContent: center;
    alignItems: center;
  `;

const T = styled.Text``;

class SignupForm extends Component {
  state = { }
  render() {
    return (
      <Root>
        <T>SignupForm</T>
      </Root>
    );
  }
}

export default SignupForm

