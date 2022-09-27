import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import {  Container, IconContainer, InputText } from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name']
}

export default function PasswordInput({iconName, ...rest}: Props){
    const theme = useTheme();
    const [isPasswordVisibile, setIsPasswordVisibile] = useState(true);

    function handlePasswordVisibilityChange(){
        setIsPasswordVisibile(!isPasswordVisibile);
    }

    return (
        <Container>
            <IconContainer>
                <Feather 
                    name={iconName}
                    size={24}
                    color={theme.colors.text_detail}
                />
            </IconContainer>
            <InputText 
                secureTextEntry={isPasswordVisibile}
                {...rest}
            />
            <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <IconContainer>
                    <Feather 
                        name={isPasswordVisibile ? "eye" : "eye-off"}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    )
}