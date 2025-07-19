import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TheoryTest from '../screens/TheoryTest';
import HazardPerception from '../screens/HazardPerception';
import HighwayCode from '../screens/HighwayCode';
import RoadSigns from '../screens/RoadSigns';
import { RootStackParamList } from './types';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Theory" component={TheoryTest} />
      <Stack.Screen name="Hazard" component={HazardPerception} />
      <Stack.Screen name="Highway" component={HighwayCode} />
      <Stack.Screen name="Signs" component={RoadSigns} />
    </Stack.Navigator>
  );
}
