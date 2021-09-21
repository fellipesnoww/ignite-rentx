import React from 'react';
import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CommonActions, useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';

import { 
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './styles';

type RootStackParamList = {
  CarDetails: undefined
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarDetails'> ;

import { Car } from '../../components/Car';
import { StackNavigationProp } from '@react-navigation/stack';

export function Home(){

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120
    },
    thumbnail: 'https://img1.gratispng.com/20180331/izq/kisspng-audi-rs-6-audi-rs6-audi-a6-car-audi-5abf3cdc8a3545.0356772815224823965661.jpg'
  };

  function handleCarDetails() {    
    navigation.navigate('CarDetails');
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
          <CarList
            data={[1,2,3]}
            keyExtractor={item => String(item)}
            renderItem={({ item }) => 
              <Car 
                data={carData}
                onPress={handleCarDetails}
              />
            }
          />
          
      </Container>
  );
} 