import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {setSelectedCharacterId} from '../redux/reducers';
import {useNavigation} from '@react-navigation/native';

const CharacterCard = props => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const character = props.character;
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
      </View>
    </TouchableOpacity>
  );
};

export default CharacterCard;
