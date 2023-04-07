import {Image} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen';
import EpisodeDetailScreen from './src/screens/EpisodeDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Main" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={CharacterDetailScreen} />
      <HomeStack.Screen name="Episode" component={EpisodeDetailScreen} />
      <HomeStack.Screen name="Favorites" component={FavoritesScreen} />
    </HomeStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{headerShown: false}}
      />
      <FavoritesStack.Screen name="Detail" component={CharacterDetailScreen} />
    </FavoritesStack.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#F6E337',
        tabBarInactiveTintColor: '#E0D3DE',
        tabBarActiveBackgroundColor: '#01161E',
        tabBarInactiveBackgroundColor: '#124559',

        tabBarIconStyle: {
          width: 40,
          height: 20,
          borderRadius: 50,
        },
        tabBarStyle: {backgroundColor: 'gray'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        // change the icon of the tab bar
        options={{
          tabBarIcon: () => (
            <Image
              style={{width: 25, height: 25, tintColor: '#E0D3DE'}}
              source={require('./assets/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritesStackScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: '#E0D3DE',
              }}
              source={require('./assets/love.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default StackNavigator;
