import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import { 
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Brand,
    Name,
    Description,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer
} from './styles';

import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

type RootStackParamList = {
  Scheduling: undefined
}

type CarDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scheduling'>;

interface Params{
  car: CarDTO;
}

export function CarDetails(){
  const navigation = useNavigation<CarDetailsScreenNavigationProp>();
  
  const route = useRoute();

  const { car } = route.params as Params;

  function handleCalendar(){
    navigation.navigate('Scheduling', {car});
  }

  function handleBack(){
    navigation.goBack();
  }

  return (
      <Container>
        <Header>
          <BackButton onPress={handleBack}/>
        </Header>
        <CarImages>
          <ImageSlider imagesUrl={car.photos}/>
        </CarImages>
        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>R${car.rent.price}</Price>
            </Rent>
          </Details>
          <Accessories>
            {car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type} 
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}
              />            
            ))}
          </Accessories>
          <About>{car.about}</About>
        </Content>
        <Footer>
          <Button title="Confirmar" onPress={handleCalendar}/>
        </Footer>
      </Container>
  );
} 