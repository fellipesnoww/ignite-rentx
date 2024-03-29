import React, { useEffect, useState } from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';

import Animated, { 
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import { 
    Container,
    Header,
    CarImages,    
    Details,
    Brand,
    Name,
    Description,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
    OfflineInfo
} from './styles';

import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { useTheme } from 'styled-components';
import { Car as ModelCar } from '../../database/models/Car';
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

type RootStackParamList = {
  Scheduling: undefined
}

type CarDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scheduling'>;

interface Params{
  car: ModelCar;
}

export function CarDetails(){
  const navigation = useNavigation<CarDetailsScreenNavigationProp>();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo();
  
  const route = useRoute();

  const { car } = route.params as Params;

  function handleCalendar(){
    navigation.navigate('Scheduling', {car});
  }

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {    
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, 
      [0, 150],
      [1, 0],
      Extrapolate.CLAMP
      )
    }
  })

  function handleBack(){
    navigation.goBack();
  }

  const theme = useTheme(); 

  useEffect(() => {
    async function fecthCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true) fecthCarUpdated();

  }, [netInfo.isConnected]);

  return (
      <Container>
        <StatusBar barStyle='dark-content' translucent backgroundColor="transparent"/>
        <Animated.View
          style={[
            headerStyleAnimation,
            styles.header,
            {
              backgroundColor: theme.colors.background_secondary
            }
          ]}
        >
          <Header>
            <BackButton onPress={handleBack}/>
          </Header>
          <Animated.View style={[sliderCarsStyleAnimation]}>
            <CarImages>
              <ImageSlider 
                imagesUrl={!!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]}
              />
            </CarImages>
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView         
          contentContainerStyle ={{            
            paddingHorizontal: 24,
            paddingTop: getStatusBarHeight() + 160
          }}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}     
          scrollEventThrottle={16}        
        >
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>{netInfo.isConnected === true ? `R$ ${car.price}` : `R$ ...`}</Price>
            </Rent>
          </Details>
          {
            carUpdated.accessories && 
            <Accessories>
              {carUpdated.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type} 
                  name={accessory.name} 
                  icon={getAccessoryIcon(accessory.type)}
                />            
              ))}
            </Accessories>
          }
          <About>{car.about}</About>         
        </Animated.ScrollView>
        <Footer>
          <Button
            enabled={netInfo.isConnected === true}
            title="Confirmar" 
            onPress={handleCalendar}
          />
          {netInfo.isConnected === false && (
            <OfflineInfo>
              Conecte-se a internet para ver mais detalhes e agendar seu carro
            </OfflineInfo>
          )}
        </Footer>
      </Container>
  );
} 

const styles = StyleSheet.create(
  {
    header: {
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 1
    }
  }
)