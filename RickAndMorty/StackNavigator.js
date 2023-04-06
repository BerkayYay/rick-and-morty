import {View, Text} from 'react-native';
import React from 'react';

import HomeScreen from './src/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen';
import EpisodeDetailScreen from './src/screens/EpisodeDetailScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={CharacterDetailScreen} />
      <Stack.Screen name="Episode" component={EpisodeDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
