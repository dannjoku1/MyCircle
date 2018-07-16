import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Platform, Keyboard } from 'react-native';
import Touchable from '@appandflow/touchable';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors } from '../utils/constants';
import CREATE_CHORD_MUTATION from '../graphql/mutations/createChord';
import GET_CHORDS_QUERY from '../graphql/queries/getChords';

const Root = styled.View`
  backgroundColor: ${props => props.theme.WHITE};
  flex: 1;
  alignItems: center;
`;

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  paddingTop: 5;
  position: relative;
`;

const Input = styled.TextInput.attrs({
  multiline: true,
  placeholder: "What's happening?",
  maxLength: 140,
  selectionColor: Platform.OS === 'ios' && colors.PRIMARY,
  autoFocus: true,
})`
  height: 40%;
  width: 100%;
  fontSize: 18;
  color: ${props => props.theme.SECONDARY};
`;

const ChordButton = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  width: 80;
  height: 40;
  borderRadius: 20;
  position: absolute;
  top: 60%;
  right: 0;
`;

const ChordButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontSize: 16;
`;

const TextLength = styled.Text`
  fontSize: 18;
  color: ${props => props.theme.PRIMARY};
  position: absolute;
  top: 45%;
  right: 5%;
`;

const T = styled.Text``

class NewChordScreen extends Component {
  state = { text: ''};

  _onChangeText = text => this.setState({ text });

  _onCreateChordPress = async () => {
    const { user } = this.props;

    await this.props.mutate({
      variables: {
        text: this.state.text
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createChord: {
          __typename: 'Chord',
          text: this.state.text,
          likeCount: 0,
          _id: Math.round(Math.random() * -1000000),
          createdAt: new Date(),
          user: {
            __typename: 'User',
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar   
          }
        },
      },        
        update: (store, { data: { createChord } }) => {
          const data = store.readQuery({ query: GET_CHORDS_QUERY });
          if (!data.getChords.find(t => t._id === createChord._id)) {
            store.writeQuery({ query: GET_CHORDS_QUERY, data: { getChords: [{ ...createChord }, ...data.getChords] } });
          }
      }
    });

  Keyboard.dismiss();
    this.props.navigation.goBack(null);   
  }
 
  get _textLength() {
    return 140 - this.state.text.length;
  }

  get _buttonDisabled() {
    return this.state.text.length < 5;
  }

  render() {
    return (
      <Root>
        <Wrapper>
          <Input value={this.state.text} onChangeText={this._onChangeText} />
          <TextLength>
            {this._textLength}
          </TextLength>
          <ChordButton onPress={this._onCreateChordPress} disabled={this._buttonDisabled}>
            <ChordButtonText>Chord</ChordButtonText>
          </ChordButton>
        </Wrapper>
      </Root>
    );
  }
}

export default compose(
  graphql(CREATE_CHORD_MUTATION),
  connect(state => ({ user: state.user.info }))
)(NewChordScreen);