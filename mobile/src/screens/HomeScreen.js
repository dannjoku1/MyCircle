import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import { ActivityIndicator, FlatList } from 'react-native'


import FeedCard from '../components/FeedCard/FeedCard'

import GET_CHORDS_QUERY from '../graphql/queries/getChords';


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
export default graphql(GET_CHORDS_QUERY)(HomeScreen);