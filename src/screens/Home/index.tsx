import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Car } from '../../components/Car';
import { StackNavigationProp } from '@react-navigation/stack';
import { synchronize } from '@nozbe/watermelondb/sync';




import { api } from '../../services/api';
import Logo from '../../assets/logo.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { Ionicons } from '@expo/vector-icons';

import Animated, { 
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { 
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    
} from './styles';

import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { LoadAnimation } from '../../components/LoadAnimation';
import { database } from '../../database';
import { Car as ModelCar } from '../../database/models/Car';

type RootStackParamList = {
  CarDetails: undefined  
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CarDetails'> ;

export function Home(){
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<HomeScreenNavigationProp>();    
  const theme = useTheme();
  const netInfo = useNetInfo();
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value}
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;

    },
    onActive(event, ctx: any){
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  function handleOpenMyCars() {    
    navigation.navigate('MyCars');
  }

  function handleCarDetails(car: ModelCar) {    
    navigation.navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    //database: qual banco é pra sincronizar (realiza a conexao)
    //pullChanges: função que busca atualizações no backend (faz o processo de fila para atualização)
    //pushChanges: função que vai enviar pro backend as ações que o usuario realizou quando estava offline
    await synchronize({
      database,
      pullChanges: async ({lastPulledAt}) => {
        const {data} = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`); //Busca carros atualizados com base na ultima sync
        
        const { changes, lastestVersion } = data;
        return { changes, timestamp: lastestVersion }
      },
      pushChanges: async ({changes}) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      }
    });
  }
  
  useEffect(() => {
    let isMounted = true;
    async function fetchCars(){
      try{
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();
        if(isMounted){
          setCars(cars);
        }
      }catch(error){
        console.log(error);
      }finally{
        if(isMounted) setLoading(false);
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    }
  }, []);  

  useEffect(() => {
    if(netInfo.isConnected){
      console.log('Online');
      offlineSynchronize();
    } else {
      console.log('Offline');
    }

  },[netInfo.isConnected])

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
              {!loading  && (<TotalCars>Total de {cars.length} Carros</TotalCars>)}
            </HeaderContent>
          </Header>
          { loading 
            ? <LoadAnimation /> 
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

          {/* <PanGestureHandler
            onGestureEvent={onGestureEvent}
          >
            <Animated.View style={[
              myCarsButtonStyle,
              {
                position: 'absolute',
                bottom: 13,
                right: 22
              }
            ]}>
              <ButtonAnimated onPress={handleOpenMyCars} style={[styles.button, {backgroundColor: theme.colors.main}]}>
                <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape}/>
              </ButtonAnimated>          
            </Animated.View>
          </PanGestureHandler> */}
          
      </Container>
  );
} 

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  }
});