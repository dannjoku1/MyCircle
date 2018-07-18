import React from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader'
import FeedCardButton from './FeedCardButton'

const Root = styled.View`
  minHeight: 180;
  backgroundColor: ${props => props.theme.NIGHTMODEMAIN}
  width: 100%;
  padding: 6px;
  shadowColor: ${props => props.theme.SECONDARY};
  shadowOffset: 0px 2px; 
  shadowRadius: 2;
  shadowOpacity: 0.2;
  marginVertical: 5;
`;

const CardContentContainer = styled.View`
  flex: 1;
  padding: 10px 20px 10px 0px;
`;

const CardContentText = styled.Text`
  fontSize:  14;
  textAlign: left;
  paddingLeft: 6;
  fontWeight: 500;
  color: ${props => props.theme.WHITE};
`;

const text = "Dan's first Chord!!!"

function FeedCard({ text, user, createdAt, likeCount }) { // now returns real data 
  return (
    <Root>
      <FeedCardHeader { ...user } createdAt={createdAt}/> 
        <CardContentContainer>
          <CardContentText>
            {text}
          </CardContentText>
        </CardContentContainer>
      <FeedCardButton likeCount={likeCount}/>
    </Root> 
  )
}

export default FeedCard;

