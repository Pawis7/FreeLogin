import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator'; // Importa la configuración de navegación

export default function App() {
  return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
  );
}
