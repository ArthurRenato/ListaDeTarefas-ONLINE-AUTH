import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../telas/HomeScreen";
import LoginScreen from "../telas/LoginScreen";
import CadastroScreen from "../telas/CadastroScreen";
import RecuperarSenhaScreen from "../telas/RecuperarSenhaScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#155e75", // Defina a cor desejada para o cabeçalho
        },
        headerTintColor: "#ecfeff", // Defina a cor do texto do cabeçalho
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerLeft: null }}
      />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="Recuperar Senha" component={RecuperarSenhaScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
