import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CharacterService from '../services/CharacterService';
import EpisodeService from '../services/EpisodeService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = () => {
  const characterId = useSelector(state => state.charAndEp.selectedCharacterId);
  const [character, setCharacter] = useState();
  const [episodeNames, setEpisodeNames] = useState([]);

  useEffect(() => {
    CharacterService.getCharacterById(characterId).then(response => {
      setCharacter(response);
    });
  }, []);

  useEffect(() => {
    if (character) {
      const episodeIds = character.episode.map(episode => {
        return episode.slice(episode.lastIndexOf('/') + 1);
      });
      episodeIds.map(episodeId => {
        EpisodeService.getEpisodes(episodeId).then(response => {
          setEpisodeNames(prevState => [...prevState, response.name]);
        });
      });
    }
  }, [character]);

  const handleAddToFavorites = async () => {
    let favorites = [];
    let isAlreadyFavorite;
    let updatedFavorites = [];
    try {
      await AsyncStorage.getItem('favorites').then(value => {
        if (value) {
          favorites = JSON.parse(value);
        } else {
          return [];
        }
      });
      if (favorites.length > 0 && favorites.length < 10) {
        favorites.map(favorite => {
          if (favorite.id == characterId) {
            isAlreadyFavorite = true;
            favorite['isFavorite'] = false;
          } else {
            favorite['isFavorite'] = true;
          }
        });

        if (isAlreadyFavorite) {
          favorites
            .filter(favorite => favorite.id != characterId)
            .map(favorite => updatedFavorites.push(favorite));
          favorites = updatedFavorites;
          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
          favorites = [];
          updatedFavorites = [];
          Alert.alert('Removed from favorites');
        } else {
          character['isFavorite'] = true;
          favorites.push(character);
          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
          favorites = [];
          Alert.alert('Added to favorites');
        }
      } else if (favorites.length == 0) {
        character['isFavorite'] = true;
        favorites.push(character);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        favorites = [];
        Alert.alert('Added to favorites');
      } else {
        Alert.alert('You can only have 10 favorites');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderEpisodes = () => {
    return episodeNames.map((episode, index) => {
      return (
        <View
          key={index}
          style={{
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            borderRadius: 10,
            paddingLeft: 20,
            borderBottomColor: '#01161E',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            {episode}
          </Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#124559',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <View
        style={{
          marginTop: 30,
        }}>
        <View>
          <Image
            style={{height: 300, width: 300, borderRadius: 100}}
            resizeMode="cover"
            source={{uri: character?.image}}
          />
        </View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 20,
            color: '#f6e337',
          }}>
          {character?.name}
        </Text>

        <ScrollView
          style={{
            marginTop: 20,
            height: 250,
            width: 350,
            backgroundColor: '#36B9CD',
            borderRadius: 15,
          }}>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              borderRadius: 10,
              paddingLeft: 20,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#f6e337'}}>
              Status:{' '}
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                {character?.status}
              </Text>
            </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#f6e337'}}>
              Species:
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                {character?.species}
              </Text>
            </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#f6e337'}}>
              Gender:
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                {character?.gender}
              </Text>
            </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#f6e337'}}>
              Origin:
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                {character?.origin.name}
              </Text>
            </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#f6e337'}}>
              Location:
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                {character?.location.name}
              </Text>
            </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#f6e337'}}>
              Episodes:
            </Text>
            {renderEpisodes()}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => handleAddToFavorites()}
          style={{
            marginTop: 20,
            height: 50,
            width: 350,
            backgroundColor: '#f6e337',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#124559'}}>
            Add to favorites
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
