import React, { Component } from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  backgroundColor: ${props => props.theme.WHITE};
  flex: 1;
  alignItems: center;
`;

const T = styled.Text``

class NewChordScreen extends Component {
  state = {  }
  render() {
    return (
      <Root>
        <T>Profile</T>
      </Root>
    );
  }
}

export default NewChordScreen;