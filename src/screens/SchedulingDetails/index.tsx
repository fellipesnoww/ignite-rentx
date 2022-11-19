import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

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
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from './styles';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';

type RootStackParamList = {
  SchedulingComplete: undefined
}

type SchedulingCompleteScreenNavigationProp = StackNavigationProp<RootStackParamList, 
'SchedulingComplete'>;

interface Params{
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod{
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const [loading, setLoading] = useState(false);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo();

  const theme = useTheme();  

  
  const navigation = useNavigation<SchedulingCompleteScreenNavigationProp>();
  
  const route = useRoute();
  const { car, dates } = route.params as Params;
  
  const rentalTotal = Number(dates.length * car.price);

  async function handleSchedulingComplete(){
    setLoading(true);
   
    await api.post('rentals', {
      user_id: 1,
      car_id: car.id,
      startDate: new Date(dates[0]),
      endDate: new Date(dates[dates.length - 1]),
      total: rentalTotal
    })
    .then(() => navigation.navigate('Confirmation', {nextScreenRoute: 'Home', title: 'Carro alugado', message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar seu automóvel`}))
    .catch(() => {
      setLoading(false);
      Alert.alert('Não possível realizar o agendamento')
    });
    
  }

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })

  },[]);

  useEffect(() => {
    async function fecthCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true) fecthCarUpdated();

  }, [netInfo.isConnected]);

  return (
      <Container>
        <Header>
          <BackButton onPress={handleBack}/>
        </Header>
        <CarImages>
          <ImageSlider 
            imagesUrl={!!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]}
          />
        </CarImages>
        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>R$ {car.price}</Price>
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

          <RentalPeriod>
            <CalendarIcon>
              <Feather 
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}          
              />
            </CalendarIcon>

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.start}</DateValue>              
            </DateInfo>

            <Feather 
                name="chevron-right"
                size={RFValue(10)}
                color={theme.colors.shape}          
            />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>{rentalPeriod.end}</DateValue>              
            </DateInfo>            
          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>R$ {car.price}x{dates.length} diárias</RentalPriceQuota>
              <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>

        </Content>
        <Footer>
          <Button 
            title="Alugar agora" 
            onPress={handleSchedulingComplete}
            color={theme.colors.success}
            enabled={!loading}
            loading={loading}
          />
        </Footer>
      </Container>
  );
} 