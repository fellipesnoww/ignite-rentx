import React from 'react';
import { StatusBar } from 'react-native';

import { 
    Container,
    Header,
} from './styles';
import { BackButton } from '../../components/BackButton';

export function CarDetails(){
  
  return (
      <Container>
        <Header>
          <BackButton onPress={() => {}}/>
        </Header>
      </Container>
  );
} 