import {Text, Button, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CharacterCardWRemove from '../components/CharacterCardWRemove';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      let favorites = [];
      try {
        await AsyncStorage.getItem('favorites').then(value => {
          if (value) {
            favorites = JSON.parse(value);
          } else {
            return [];
          }
        });
        setFavorites(favorites);
        favorites = [];
      } catch (e) {
        console.log(e);
      }
    };
    getFavorites();
  }, [favorites]);

  return (
    <ScrollView>
      <Button title="Clear Favorites" onPress={() => AsyncStorage.clear()} />
      {favorites.length > 0 ? (
        favorites.map(favorite => {
          return (
            <CharacterCardWRemove key={favorite.id} character={favorite} />
          );
        })
      ) : (
        <Text>No favorites</Text>
      )}
    </ScrollView>
  );
};

export default FavoritesScreen;
