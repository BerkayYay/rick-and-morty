import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CharacterService from '../services/CharacterService';

const EpisodeCard = props => {
  const [charUrls, setCharUrls] = useState(props.characters);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    charUrls.map(url => {
      CharacterService.getCharacterByUrl(`${url}/?page=${page}`).then(
        response => {
          setCharacters(chars => [...chars, response]);
        },
      );
    });

    setCharacters([]);
  }, [page]);

  const characterInfo = useMemo(() => {
    return characters.map(character => {
      return {
        id: character.id,
        name: character.name,
        image: character.image,
        status: character.status,
        species: character.species,
      };
    });
  }, [characters]);

  const renderCharacters = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#124559',
        }}
        onPress={() => {
          console.log(item.id);
        }}>
        {/* Character Image */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Image
            source={{uri: item.image}}
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
              {item.name}
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
              {item.status}
            </Text>
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#F6E337'}}>
            Species:
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
              }}>
              {item.species}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#36B9CD',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
      }}>
      {/* Episode Header Begin*/}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: '#F6E337',
            }}>
            {props.episode.name}
          </Text>
          <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
            {props.episode.episode}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}>
          <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
            {props.episode.air_date}
          </Text>
        </View>
      </View>
      {/* Episode Header End*/}

      {/* Character List Begin*/}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: 'white',
            fontWeight: 'bold',
            marginLeft: -0.5,
          }}>
          Characters:
        </Text>

        <FlatList
          data={characterInfo}
          renderItem={renderCharacters}
          keyExtractor={item => item.id}
          horizontal={true}
          onEndReachedThreshold={0.8}
          onEndReached={() => {
            setPage(page => page + 1);
          }}
        />
      </View>

      {/* Character List End*/}
    </View>
  );
};

export default EpisodeCard;
