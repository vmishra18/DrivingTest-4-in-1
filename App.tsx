import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}