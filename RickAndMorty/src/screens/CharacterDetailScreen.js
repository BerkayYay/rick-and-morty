import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CharacterService from '../services/CharacterService';
import EpisodeService from '../services/EpisodeService';
import {useNavigation} from '@react-navigation/native';

const DetailScreen = () => {
  const characterId = useSelector(state => state.charAndEp.selectedCharacterId);
  const [character, setCharacter] = useState();
  const [episodeNames, setEpisodeNames] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}
          style={{
            marginRight: 20,
            backgroundColor: '#f6e337',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Fav</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    CharacterService.getCharacterById(characterId).then(response => {
      setCharacter(response);
    });
  }, [characterId]);

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
          <Text
            key={index}
            style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
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
        <View style={styles2.shadow}>
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
      </View>
    </SafeAreaView>
  );
};

const styles2 = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
});

export default DetailScreen;
