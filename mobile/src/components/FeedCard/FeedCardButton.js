import React from 'react';
import styled from 'styled-components/native';
import { SimpleLineIcons, Entypo, EvilIcons } from '@expo/vector-icons'
import Touchable from '@appandflow/touchable';

import { colors } from '../../utils/constants';

const ICON_SIZE = 20;

const Root = styled.View`
  height: 40;
  flexDirection: row;
`;

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  flex: 1; 
  flexDirection: row;
  alignItems: center;
  justifyContent: space-around;
  paddingHorizontal: 32px;
`;

const isLiked = false ;

const ButtonText = styled.Text`
  fontSize: 14;
  fontWeight: 500;
  color: ${props => props.theme.SECONDARY};

`;

function FeedCardButton({ likeCount }) { 
  return (
    <Root>
      <Button>
        <SimpleLineIcons name="bubble" color={colors.SECONDARY} size={ICON_SIZE} />
        <ButtonText>
          {likeCount}
        </ButtonText>
      </Button>
      <Button>
      <Entypo name="ccw" color={colors.SECONDARY} size={ICON_SIZE} />
        <ButtonText>
          {likeCount}
        </ButtonText>
      </Button>
      <Button>
        <EvilIcons name="like" color={isLiked ? 'blue' : colors.SECONDARY} size={ICON_SIZE} />
        <ButtonText>
          {likeCount}
        </ButtonText>
      </Button>

    </Root>
  )
}

export default FeedCardButton;

