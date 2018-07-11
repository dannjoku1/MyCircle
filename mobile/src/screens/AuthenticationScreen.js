import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable'

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.SECONDARY};
  position: relative;  
`;

const ButtonLoginText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: bold;
  fontSize: 20;  
`;

const ButtonLogin = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  height: 75;
  width: 150;
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 40%
  right: 110;
  borderRadius: 20;
  `;

  const BottomTextContainer = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0; 
    height: 200;
    justifyContent: center;
    alignItems: center;
  `;

  const Button = styled(Touchable).attrs({
    feedback: 'opacity',
  })`
    justifyContent: center;
    alignItems: center;
  `;

  const ButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: 400;
  fontSize: 15;  
`;



class AuthenticationScreen extends Component {
  state = { }
  render() {
    return (
      <Root>
        <ButtonLogin>
          <ButtonLoginText>
            Sign Up
          </ButtonLoginText>
        </ButtonLogin>
        <BottomTextContainer>
          <Button>
            <ButtonText>
              Already have an account?
            </ButtonText>
          </Button>
        </BottomTextContainer>
      </Root>
    );
  }
}

export default AuthenticationScreen;