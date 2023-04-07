import {View, Text, Alert, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import EpisodeService from '../services/EpisodeService';
import CharacterService from '../services/CharacterService';
import CharacterCard from '../components/CharacterCard';

const EpisodeDetailScreen = () => {
  const nav = useNavigation();
  const selectedEpisodeId = useSelector(
    state => state.charAndEp.selectedEpisodeId,
  );
  const [episode, setEpisode] = useState({});
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    EpisodeService.getEpisodes(`${selectedEpisodeId}`)
      .then(response => {
        setEpisode(response);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  }, []);

  useEffect(() => {
    if (episode.characters) {
      episode.characters.map(characterUrl => {
        CharacterService.getCharacterByUrl(characterUrl).then(response => {
          setCharacters(characters => [...characters, response]);
        });
      });
    }
  }, [episode]);

  return (
    <View>
      <TouchableOpacity
        key={episode.id}
        style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}
        onPress={() => nav.goBack()}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          Go Back
        </Text>
      </TouchableOpacity>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginTop: 20,
          }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#36b9cd',
                paddingLeft: 10,
              }}>
              {episode.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
                paddingRight: 10,
              }}>
              {episode.air_date}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              paddingLeft: 10,
              marginTop: 10,
            }}>
            {episode.episode}
          </Text>
          <Text
            style={{
              paddingLeft: 10,
              marginTop: 20,
              color: '#36b9cd',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Characters
          </Text>
          <ScrollView
            style={{
              height: 500,
              width: '100%',
              marginTop: 10,
              marginBottom: 10,
            }}>
            {characters.map(character => {
              return <CharacterCard character={character} />;
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default EpisodeDetailScreen;
