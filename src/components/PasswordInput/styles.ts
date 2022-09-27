
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    margin-bottom: 16px;
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
