import React, { Component } from 'react';
import styled from 'styled-components/native';

import FeedCard from '../components/FeedCard/FeedCard'

 const Root = styled.View`
  backgroundColor: white;
  flex: 1;
  justifyContent: center;
  
 `;

class HomeScreen extends Component {
  state = { }
    render() {
      return (
        <Root> 
          <FeedCard /> 
        </Root>
      );
    } 
}

export default HomeScreen;