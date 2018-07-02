import React from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader'
import FeedCardButton from './FeedCardButton'

const Root = styled.View`
  minHeight: 180;
  backgroundColor: red;
  width: 100%;
  shadowColor: ${props => props.theme.SECONDARY};
  shadowOffset: 0px 2px; 
  shadowRadius: 2;
  shadowOpacity: 0.2;
`;

const CardContentContainer = styled.View`
  flex: 1;
  backgroundColor: blue;
`;

function FeedCard() { 
  return (
    <Root>
      <FeedCardHeader />
      <CardContentContainer />
      <FeedCardButton />
    </Root> 
  )
}

export default FeedCard;

