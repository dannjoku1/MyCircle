import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose, withApollo } from 'react-apollo';
import { ActivityIndicator, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { getUserInfo } from '../actions/user'

import FeedCard from '../components/FeedCard/FeedCard'

import GET_CHORDS_QUERY from '../graphql/queries/getChords';
import ME_QUERY from '../graphql/queries/me';
import CHORD_ADDED_SUBSCRIPTION from '../graphql/subscriptions/chordAdded';


const Root = styled.View`
  flex: 1;
  paddingTop: 5;
 `;
 
const List = styled.ScrollView``

class HomeScreen extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: CHORD_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newChord = subscriptionData.data.chordAdded;

        if (!prev.getChords.find(t => t._id === newChord._id)) {
          return {
            ...prev,
            getChords: [{ ...newChord }, ...prev.getChords]
          };
        }
        return prev;
      }
    })
  }

  componentDidMount() {
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    this.props.getUserInfo(me);
  };

  _renderItem = ({ item }) => <FeedCard {...item} />

    render() {
      const { data } = this.props;
      if (data.loading) {
        return(
          <Root>
            <ActivityIndicator size="large"/> 
          </Root>
        )
      }
      return (
        <Root> 
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={data.getChords}
            keyExtractor={item => item._id}
            renderItem={this._renderItem}
          />
        </Root>
      );
    } 
}
export default withApollo(compose(
  connect(undefined, { getUserInfo }),
  graphql(GET_CHORDS_QUERY) 
)(HomeScreen));