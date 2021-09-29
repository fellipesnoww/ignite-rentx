import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';

import {
    Container,
    Header,
    Title,
    RetalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { Alert } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';

type RootStackParamList = {
    SchedulingDetails: undefined
}
  
type SchedulingScreenNavigationProp = StackNavigationProp<RootStackParamList, 
'SchedulingDetails'>;

interface RentalPeriod{    
    startFormatted: string;    
    endFormatted: string;
}

interface Params{
    car: CarDTO;
  }

export function Scheduling(){
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();

    const route = useRoute();

    const { car } = route.params as Params;

    const navigation = useNavigation<SchedulingScreenNavigationProp>();
  
    function handleSchedulingDetails(){
        if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
            Alert.alert('Selecione o intervalo para alugar');
        } else {
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates),
            });
        }
    }


  function handleBack(){
    navigation.goBack();
  }

  function handleDayPress(date: DayProps){
      let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
      let end = date;

      if(start.timestamp > end.timestamp){
          start = end;
          end = start;
      }

      setLastSelectedDate(end);
      const interval = generateInterval(start, end);
      setMarkedDate(interval);

      const firstDate = Object.keys(interval)[0];
      const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

      setRentalPeriod({          
          startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyy'),
          endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyy'),
      });

  }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton color={theme.colors.shape} onPress={handleBack}/>
                <Title>
                    Escolha uma{'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RetalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg/>

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>
                </RetalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleDayPress}
                />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleSchedulingDetails}/>
            </Footer>
        </Container>
    )
}