import {View, Text, TouchableOpacity, Image, Button, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setSelectedCharacterId} from '../redux/reducers';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CharacterCardWRemove = props => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const character = props.character;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      let favorite = [];
      try {
        await AsyncStorage.getItem('favorites').then(value => {
          if (value) {
            favorite = JSON.parse(value);
          } else {
            return [];
          }
        });
        setFavorites(favorite);
        favorite = [];
      } catch (e) {
        console.log(e);
      }
    };
    getFavorites();
  }, [favorites]);

  const handleRemoveFromFavorites = async id => {
    let favorites = [];
    let updatedFavorites = [];
    try {
      await AsyncStorage.getItem('favorites').then(value => {
        if (value) {
          favorites = JSON.parse(value);
        } else {
          return [];
        }
      });
      favorites
        .filter(favorite => favorite.id != id)
        .map(favorite => updatedFavorites.push(favorite));
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(() => [...updatedFavorites]);
    } catch (e) {
      console.log(e);
    }
  };

  openAlert = () => {
    Alert.alert(
      'Warning!',
      'Do you want to remove this character from your favorites?',
      [
        {text: 'Yes', onPress: () => handleRemoveFromFavorites(character.id)},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      {
        cancelable: true,
      },
    );
  };
  return (
    <TouchableOpacity
      key={character.id}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#124559',
      }}
      onPress={() => {
        dispatch(setSelectedCharacterId(character.id));
        nav.navigate('Detail');
      }}>
      {/* Character Image */}
      <View
        key={character.id}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Image
          source={{uri: character.image}}
          style={{width: 100, height: 100, borderRadius: 10}}
        />
      </View>

      {/* Character Informations */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginLeft: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: '#F6E337',
          }}>
          Name:
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: 'black',
            }}>
            {character.name}
          </Text>
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: '#F6E337',
            width: 200,
          }}>
          Status:
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: 'black',
            }}>
            {character.status}
          </Text>
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: '#F6E337',
          }}>
          Species:
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: 'black',
            }}>
            {character.species}
          </Text>
        </Text>
        <Button
          style={{marginTop: 10}}
          title="Remove"
          onPress={() => openAlert()}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CharacterCardWRemove;
