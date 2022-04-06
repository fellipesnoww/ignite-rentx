import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Car } from '../../components/Car';
import { StackNavigationProp } from '@react-navigation/stack';
import { api } from '../../services/api';
import Logo from '../../assets/logo.svg';
import { CarDTO } from '../../dtos/CarDTO';
import {Ionicons} from '@expo/vector-icons';

import { 
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    MyCarsButton
} from './styles';

import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';

type RootStackParamList = {
  CarDetails: undefined  
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarDetails'> ;

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<HomeScreenNavigationProp>();    
  const theme = useTheme();

  function handleOpenMyCars() {    
    navigation.navigate('MyCars');
  }

  function handleCarDetails(car: CarDTO) {    
    navigation.navigate('CarDetails', { car });
  }
  
  useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get('/cars');
        setCars(response.data);
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    fetchCars();
    
  }, []);

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
              <TotalCars>Total de {cars.length} Carros</TotalCars>
            </HeaderContent>
          </Header>
          { loading 
            ? <Load /> 
            : 
            <CarList
              data={cars}
              keyExtractor={item => item.id}
              renderItem={({ item }) => 
                <Car 
                  data={item}
                  onPress={() => handleCarDetails(item)}
                />
              }
            />
          }

          <MyCarsButton onPress={handleOpenMyCars}>
            <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape}/>
          </MyCarsButton>          
          
      </Container>
  );
} 