import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  SchedulingComplete: undefined
}

type SchedulingCompleteScreenNavigationProp = StackNavigationProp<RootStackParamList, 
'SchedulingComplete'>;

export function SchedulingDetails(){
  const theme = useTheme();  

  const navigation = useNavigation<SchedulingCompleteScreenNavigationProp>();
  
    function handleSchedulingComplete(){
        navigation.navigate('SchedulingComplete');
    }

  return (
      <Container>
        <Header>
          <BackButton onPress={() => {}}/>
        </Header>
        <CarImages>
          <ImageSlider imagesUrl={['https://img1.gratispng.com/20180331/izq/kisspng-audi-rs-6-audi-rs6-audi-a6-car-audi-5abf3cdc8a3545.0356772815224823965661.jpg']}/>
        </CarImages>
        <Content>
          <Details>
            <Description>
              <Brand>Audi</Brand>
              <Name>RS 5 Coupé</Name>
            </Description>

            <Rent>
              <Period>Ao dia</Period>
              <Price>R$ 580</Price>
            </Rent>
          </Details>
          <Accessories>
            <Accessory name="380Km/h" icon={speedSvg}/>
            <Accessory name="3.2s" icon={accelerationSvg}/>
            <Accessory name="800 HP" icon={forceSvg}/>
            <Accessory name="Gasolina" icon={gasolineSvg}/>
            <Accessory name="Auto" icon={exchangeSvg}/>
            <Accessory name="2 pessoas" icon={peopleSvg}/>
          </Accessories> 

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
              <DateValue>16/10/2021</DateValue>              
            </DateInfo>

            <Feather 
                name="chevron-right"
                size={RFValue(10)}
                color={theme.colors.shape}          
            />

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>16/10/2021</DateValue>              
            </DateInfo>            
          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
              <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>

        </Content>
        <Footer>
          <Button 
            title="Alugar agora" 
            onPress={handleSchedulingComplete}
            color={theme.colors.success}
          />
        </Footer>
      </Container>
  );
} 