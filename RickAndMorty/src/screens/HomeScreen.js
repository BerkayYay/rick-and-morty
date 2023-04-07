import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import EpisodeCard from '../components/EpisodeCard';
import EpisodeService from '../services/EpisodeService';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const HomeScreen = () => {
  const nav = useNavigation();
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState([1, 2, 3, 4, 5]);
  const [episodePerPage, setEpisodePerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    });
  }, []);

  const handleLoadMore = () => {
    for (
      let i = episodePerPage + 1, j = 0;
      i <= page.length + episodePerPage;
      i++, j++
    ) {
      if (episodePerPage > 51) {
        Alert.alert('No more episodes to load');
        break;
      }
      if (j < episodePerPage) {
        page.push(i);
        page.shift();
      } else {
        break;
      }
    }
    setPage([...page]);
    setEpisodePerPage(episodePerPage + 5);
  };

  const handleLoadLess = () => {
    for (let index = 0; index < 5; index++) {
      if (episodePerPage <= 5) {
        Alert.alert('No more episodes to load');
        break;
      }
      let i = page[0] - 5;
      page.push(i);
      page.shift();
    }
    if (episodePerPage < 6) {
      Alert.alert('No more episodes to load');
    } else {
      setPage([...page]);
      setEpisodePerPage(episodePerPage => episodePerPage - 5);
    }
  };

  useEffect(() => {
    EpisodeService.getEpisodes(page)
      .then(response => {
        setEpisodes(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, [page]);

  return (
    <SafeAreaView>
      {/* Search Bar */}
      <View
        style={{
          backgroundColor: '#E0D3DE',
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}>
        <TextInput
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}
          placeholder="Not Working Yet"
        />
      </View>
      <ScrollView style={{backgroundColor: '#E0D3DE'}}>
        {episodes?.map(episode => {
          return (
            <EpisodeCard
              episode={episode}
              characters={episode.characters}
              key={episode.id}
            />
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 70,
          }}>
          <TouchableOpacity
            onPress={handleLoadLess}
            style={{
              backgroundColor: '#e74c3c',
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLoadMore}
            style={{
              backgroundColor: '#e74c3c',
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
