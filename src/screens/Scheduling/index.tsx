import React from 'react';
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
import { Calendar } from '../../components/Calendar';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    SchedulingDetails: undefined
}
  
type SchedulingScreenNavigationProp = StackNavigationProp<RootStackParamList, 
'SchedulingDetails'>;

export function Scheduling(){
    const theme = useTheme();

    const navigation = useNavigation<SchedulingScreenNavigationProp>();
  
    function handleSchedulingDetails(){
        navigation.navigate('SchedulingDetails');
    }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton color={theme.colors.shape} onPress={() => {}}/>
                <Title>
                    Escolha uma{'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RetalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={false}>
                            16/10/2021
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg/>

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={false}>
                            16/10/2021
                        </DateValue>
                    </DateInfo>
                </RetalPeriod>
            </Header>

            <Content>
                <Calendar/>
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleSchedulingDetails}/>
            </Footer>
        </Container>
    )
}