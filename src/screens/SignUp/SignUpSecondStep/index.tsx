import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../../components/BackButton";
import Bullet from "../../../components/Bullet";
import { Button } from "../../../components/Button";

import PasswordInput from "../../../components/PasswordInput";
import { api } from "../../../services/api";

import { Container, Form, FormTitle, Header, Steps, Subtitle, Title } from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

function SignUpSecondStep(){
    const navigation = useNavigation();
    const theme = useTheme();

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const route = useRoute();

    const {user} = route.params as Params;
    
    async function handleRegister(){
      if(!password || !passwordConfirm){
        return Alert.alert('Opa', 'Informe uma senha e confirmação.');
      }

      if(password != passwordConfirm){
        return Alert.alert('As senhas não são iguais.');
      }
      
      await api.post('users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password
      })
      .then(() => {
        navigation.navigate('Confirmation', {nextScreenRoute: 'SignIn', title: 'Conta criada', message: `Agora é so fazer o login\ne aproveitar`});
      })
      .catch(() => {
        Alert.alert('Opa', 'Não foi possível cadastrar')
      });
    }

    function handleBack(){
        navigation.goBack();
    }

    return (
      <KeyboardAvoidingView 
            behavior="position"
            enabled
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <Container>
              <Header>
                  <BackButton onPress={handleBack}/>
                  <Steps>
                    <Bullet />
                    <Bullet active/>
                  </Steps>
              </Header>
              <Title>Crie sua{'\n'}conta</Title>
              <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>
              <Form>
                <FormTitle>2. Senha</FormTitle>
                <PasswordInput 
                  iconName="lock"
                  placeholder="Senha"
                  keyboardAppearance="dark"                    
                  returnKeyType="go"
                  onChangeText={setPassword}
                  value={password}
                />
                <PasswordInput 
                  iconName="lock"
                  placeholder="Repetir senha"
                  keyboardAppearance="dark"                    
                  returnKeyType="go"
                  onChangeText={setPasswordConfirm}
                  value={passwordConfirm}
                />
                

              </Form>
              <Button 
                title="Cadastrar"
                color={theme.colors.success}
                onPress={handleRegister}
                
              />
            </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    )
}

export default SignUpSecondStep;