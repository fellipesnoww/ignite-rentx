import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import { Car as ModelCar} from '../../database/models/Car';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './styles';


interface Props extends RectButtonProps {
    data: ModelCar;
}

export function Car({ data, ...rest }: Props){
    const netInfo = useNetInfo();

    const MotorIcon = getAccessoryIcon(data.fuel_type);
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>{netInfo.isConnected === true ? `R$ ${data.price}` : `R$ ...`}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon />
                    </Type>
                </About>
            </Details>

            <CarImage 
                source={{uri: data.thumbnail}}
                resizeMode="contain"    
            />
        </Container>
    )
}