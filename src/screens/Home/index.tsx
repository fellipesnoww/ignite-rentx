import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { 
    Container,
    Header,
    HeaderContent,
    TotalCars
} from './styles';

import { Car } from '../../components/Car';

export function Home(){
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120
    },
    thumbnail: 'https://img1.gratispng.com/20180331/izq/kisspng-audi-rs-6-audi-rs6-audi-a6-car-audi-5abf3cdc8a3545.0356772815224823965661.jpg'
  }
  return (
      <Container>
          <StatusBar 
            barStyle="light-content"            
            backgroundColor="transparent"      
            translucent
          />
          <Header>
            <HeaderContent>
              <Logo width={RFValue(108)} height={RFValue(12)}/>
              <TotalCars>Total de 12 Carros</TotalCars>
            </HeaderContent>
          </Header>
          <Car data={carData}/>
          <Car data={carData}/>
          <Car data={carData}/>
          <Car data={carData}/>
          <Car data={carData}/>
          <Car data={carData}/>
          <Car data={carData}/>

      </Container>
  );
} 