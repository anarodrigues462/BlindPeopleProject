
import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import RotasPreferidas from './RotasPreferidas';
import Banco from './Banco';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BlindRoute" component={HomeScreen} />
        <Stack.Screen name="Rotas Preferidas" component={RotasPreferidas} />    
        <Stack.Screen name="Banco" component={Banco} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;