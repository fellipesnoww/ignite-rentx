import React, { useState } from "react";
import { 
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import * as Yup from 'yup';

import { Container, Footer, Form, Header, Subtitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function SignIn(){

    const theme = useTheme();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    function handleNewAccount(){
        navigation.navigate('SignUpFirstStep');
    }

    async function handleSignIn(){
        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('A senha é obrigatória')
            });
    
            await schema.validate({email, password});

            //TODO: Fazer login
            Alert.alert('TUDO CERTO!');
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique suas credenciais');
            }
        }
    }


    return (
        <KeyboardAvoidingView 
            behavior="position"
            enabled
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                            onChangeText={setEmail}
                            value={email}
                        />
                        <PasswordInput 
                            iconName="lock"
                            placeholder="Senha"
                            keyboardAppearance="dark"                    
                            returnKeyType="go"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            enabled
                            loading={false}
                        />
                        <Button
                            title="Criar conta gratuita"
                            onPress={handleNewAccount}
                            enabled
                            loading={false}
                            color={theme.colors.background_secondary}
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}