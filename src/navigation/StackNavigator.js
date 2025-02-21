import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import HomeScreen from "../screens/homeScreen";
import {LoginScreen}  from "../auth/LoginScreen";
import {RegisterScreen} from "../auth/registerScreen";
import {MainScreen} from "../screens/MainScreen";


const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Main" component={MainScreen} />

    </Stack.Navigator>
  );
}
