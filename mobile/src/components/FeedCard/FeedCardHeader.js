import React from 'react';
import styled from 'styled-components/native';

import { fakeAvatar } from '../../utils/constants';

const AVATAR_SIZE = 40;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`
  height: 50;
  flexDirection: row; 
  alignItems: center;
`;

const AvatarContainer = styled.View`
  flex: 0.2;
  justifyContent: center;
  alignSelf: stretch;
`;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`;

const MetaContainer = styled.View`
  flex: 1;
  alignSelf: stretch;
`;

const MetaTopContainer = styled.View`
  flex: 1;
  alignSelf: stretch;
  flexDirection: row;
  alignItems: center;
  justifyContent: flex-start;
`;

const MetaBottomContainer = styled.View`
  flex: 0.8;
  alignSelf: stretch;
  flexDirection: row;
  alignItems: center;
  justifyContent: flex-start;
`;

const MetaText = styled.Text`
  fontSize: 14;
  fontWeight: 600;
  color: ${props => props.theme.LIGHT_GRAY};
`;

const MetaFullName = styled.Text`
  fontSize: 16;
  fontWeight: bold;
  color: ${props => props.theme.SECONDARY};
`;

const avatar = fakeAvatar;
const userName = "Dannjoku";
const firstName = "Dan";
const lastName = "Njoku";
const createdAt = "12 hours ago";



function FeedCardHeader() { 
  return (
    <Root>
      <AvatarContainer>
        <Avatar source={{ uri: avatar }} />
      </AvatarContainer>
      <MetaContainer>
        <MetaTopContainer>
          <MetaFullName>
            {firstName} {lastName}
          </MetaFullName>
          <MetaText style={{ marginLeft: 10 }}> 
            @{userName}
          </MetaText>
        </MetaTopContainer>
        <MetaBottomContainer>
          <MetaText>
            {createdAt}
          </MetaText>
        </MetaBottomContainer>
      </MetaContainer>
    </Root> 
  )
}

export default FeedCardHeader;

