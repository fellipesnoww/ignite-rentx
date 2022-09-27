import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { Container, Footer, Form, Header, Subtitle, Title } from "./styles";

export default function SignIn(){

    const theme = useTheme();
    
    return (
        <Container>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <Header>
                <Title>Estamos{'\n'}quase lá.</Title>
                <Subtitle>
                    Faça seu login para começar{'\n'}
                    uma experiência incrível.
                </Subtitle>
            </Header>
            <Form>
                <Input 
                    iconName="mail"
                    placeholder="Email"
                    keyboardAppearance="dark"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect
                />
                <PasswordInput 
                    iconName="lock"
                    placeholder="Senha"
                    keyboardAppearance="dark"                    
                    returnKeyType="go"                    
                />
            </Form>

            <Footer>
                <Button
                    title="Login"
                    onPress={() => {}}
                    enabled={false}
                    loading={false}
                />
                <Button
                    title="Criar conta gratuita"
                    onPress={() => {}}
                    enabled
                    loading={false}
                    color={theme.colors.background_secondary}
                    light
                />
            </Footer>
        </Container>
    )
}