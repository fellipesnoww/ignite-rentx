import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';


import {
    Container,
    Content,
    Title,
    Message,
    Footer
} from './styles';

import { ConfirmButton } from '../../components/ConfirmButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';

type RootStackParamList = {
    Home: undefined
}
  
type SchedulingCompleteScreenNavigationProp = StackNavigationProp<RootStackParamList, 
'Home'>;

interface Params{
    title: string;
    message: string;
    nextScreenRoute: string; 
}

export function Confirmation(){
    const { width } = useWindowDimensions();

    const route = useRoute();
    const {message, nextScreenRoute, title} = route.params as Params;
    
    const navigation = useNavigation<SchedulingCompleteScreenNavigationProp>();
  
    function handleConfirm(){
        navigation.navigate(nextScreenRoute);
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg
                width={width}
            />

            <Content>
                <DoneSvg
                    width={80}
                    height={80}
                />
                <Title>{title}</Title>
                <Message>
                    {message}
                </Message>
                <Footer>
                    <ConfirmButton title="OK" onPress={handleConfirm}/>
                </Footer>
            </Content>
        </Container>        
    );
}