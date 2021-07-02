import React from 'react';
import { StatusBar } from 'react-native';

import { 
    Container,
    Header,
    CarImages
} from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

export function CarDetails(){
  
  return (
      <Container>
        <Header>
          <BackButton onPress={() => {}}/>
        </Header>
        <CarImages>
          <ImageSlider imagesUrl={['https://img1.gratispng.com/20180331/izq/kisspng-audi-rs-6-audi-rs6-audi-a6-car-audi-5abf3cdc8a3545.0356772815224823965661.jpg']}/>
        </CarImages>
      </Container>
  );
} 