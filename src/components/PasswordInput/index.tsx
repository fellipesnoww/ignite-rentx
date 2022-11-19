import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import {  Container, IconContainer, InputText } from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export default function PasswordInput({iconName, value, ...rest}: Props){
    const theme = useTheme();
    const [isPasswordVisibile, setIsPasswordVisibile] = useState(true);

    function handlePasswordVisibilityChange(){
        setIsPasswordVisibile(!isPasswordVisibile);
    }

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocused(){
        setIsFocused(true);
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!value);
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather 
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}                    
                />
            </IconContainer>
            <InputText 
                secureTextEntry={isPasswordVisibile}
                onFocus={handleInputFocused}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                autoCorrect={false}
                {...rest}
            />
            <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <IconContainer 
                    isFocused={isFocused}
                >
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