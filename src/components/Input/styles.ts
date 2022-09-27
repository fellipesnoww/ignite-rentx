import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";


interface ContainerProps {
    isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    margin-bottom: 8px;

    ${({theme, isFocused}) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${({theme}) => theme.colors.main};        
    `}
`;

export const IconContainer = styled.View`
    width: 55px;
    height: 56px;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.background_secondary};
    margin-right: 2px;
`;

export const InputText = styled.TextInput`
    background-color: ${({theme}) => theme.colors.background_secondary};
    flex: 1;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    padding: 0 23px;
`;