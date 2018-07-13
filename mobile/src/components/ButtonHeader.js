import React from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

const Button = styled(Touchable).attrs({
    feedback: 'opacity'
  })`
    marginRight: ${props => props.side === 'right' ? 15 : 10};
    marginLeft: ${props => props.side === 'left' ? 15 : 10};
    justifyContent: center;
    alignItems: center; 
  `;

  export default function ButtonHeader({ side, children, onPress, disabled }) {
      return(
          <Button onPress={onPress} disabled={disabled}>
              {children}
          </Button>
      )
  }