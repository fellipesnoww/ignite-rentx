import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { BackButton } from "../../../components/BackButton";
import Bullet from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import Input from "../../../components/Input";
import { Container, Form, FormTitle, Header, Steps, Subtitle, Title } from "./styles";


function SignUpFirstStep(){
    const navigation = useNavigation();

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
                <FormTitle>1. Dados</FormTitle>
                <Input 
                  iconName="user"
                  placeholder="Nome"
                />
                <Input 
                  iconName="mail"
                  placeholder="Email"
                  keyboardAppearance="dark"
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect
                />
                <Input 
                  iconName="credit-card"
                  placeholder="CNH"
                />

              </Form>
              <Button 
                title="Próximo"
              />
            </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    )
}

export default SignUpFirstStep;