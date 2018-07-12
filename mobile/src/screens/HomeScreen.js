import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose, withApollo } from 'react-apollo';
import { ActivityIndicator, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { getUserInfo } from '../actions/user'

import FeedCard from '../components/FeedCard/FeedCard'

import GET_CHORDS_QUERY from '../graphql/queries/getChords';
import ME_QUERY from '../graphql/queries/me'


const Root = styled.View`
  flex: 1;
  paddingTop: 5;
 `;
 
const List = styled.ScrollView``

class HomeScreen extends Component {
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
  connect(undifined, { getUserInfo }),
  graphql(GET_CHORDS_QUERY) 
)(HomeScreen));