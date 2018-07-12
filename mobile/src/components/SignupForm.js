import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform, Keyboard, AsyncStorage } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors, fakeAvatar } from '../utils/constants';
import SIGNUP_MUTATION from '../graphql/mutations/signup'
import Loading from './Loading';
import { login } from '../actions/user'

const Root = styled(Touchable).attrs({
  feedback: 'none',
})`
  flex: 1;
  position: relative;
  justifyContent: center;
  alignItems: center;
`;

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 5%;
  left: 5%;
  zIndex: 1;
` 

const Wrapper = styled.View`
  alignSelf: stretch;
  alignItems: center;
  justifyContent: center;
  flex: 1;
`;

const InputWrapper = styled.View`
  height: 50;
  width: 70%;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.LIGHT_GRAY};
  marginVertical: 6;
  justifyContent: flex-end;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT_GRAY,
  selectionColor: Platform.OS === 'ios' ? colors.PRIMARY : undefined,
  autoCorrect: false,
})`
  height: 30;
  color: ${props => props.theme.WHITE};
`;


const ButtonConfirm = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  position: absolute;
  bottom: 15%;
  width: 70%;
  height: 50;
  backgroundColor: ${props => props.theme.PRIMARY};
  borderRadius: 10;
  justifyContent: center;
  alignItems: center;
  elevation: 2;
`;

const ButtonConfirmText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: 600;
`;

class SignupForm extends Component {
  state = { 
    fullName: '',
    email: '',
    password: '',
    userName: '',
    loading: '',
  };

  _onOutsidePress = () => Keyboard.dismiss();

  _onChangeText = (text, type) => this.setState({ [type]: text });

  _checkIfDisabled() {
    const { fullName, email, password, userName } = this.state;

    if (!fullName || !email || !password || !userName) {
      return true;
    }
    return false;
  }

  _onSignupPress = async () => {
    this.setState({ loading: true });
    const { fullName, email, password, userName } = this.state; // pull user info from state 
    const avatar = fakeAvatar; // import fake avatar ... might remove later 



    try {    
      const { data } = await this.props.mutate({
        variables: {
          fullName,
          email,
          password,
          userName,
          avatar,
        }
      }); 
      await AsyncStorage.setItem('@mycircle', data.signup.token);
      this.setState({ loading: false });
      return this.props.login();
    } catch (error) {
      throw error;
    }


 
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Root onPress={this._onOutsidePress}>
        <BackButton onPress={this.props.onBackPress}>
          <MaterialIcons color={colors.WHITE} size={30} name="arrow-back"/>
        </BackButton>
        <Wrapper>
          <InputWrapper>
            <Input 
              placeholder="Full Name" 
              autoCapitalize="words" 
              onChangeText={text => this._onChangeText(text, 'fullName')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input 
              placeholder="Email" 
              autoCapitalize="none" 
              keyboardType="email-address" 
              onChangeText={text => this._onChangeText(text, 'email')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input 
              placeholder="Password" 
              secureTextEntry 
              onChangeText={text => this._onChangeText(text, 'password')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input 
              placeholder="Username" 
              autoCapitalize="none" 
              onChangeText={text => this._onChangeText(text, 'userName')}
            />
          </InputWrapper>
        </Wrapper>
        <ButtonConfirm onPress={this._onSignupPress} disabled={this._checkIfDisabled()}>
          <ButtonConfirmText>
            Sign Up
          </ButtonConfirmText>
        </ButtonConfirm>
      </Root>
    );
  }
}

export default compose(
  graphql(SIGNUP_MUTATION),
  connect(undefined, { login }),
)(SignupForm); 

 