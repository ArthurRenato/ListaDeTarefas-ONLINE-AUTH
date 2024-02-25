import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigator from "./src/navegacao/StackNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator></StackNavigator>
    </NavigationContainer>
  );
};

export default App;
