import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EpisodeCard from '../components/EpisodeCard';
import EpisodeService from '../services/EpisodeService';

const HomeScreen = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState([1, 2, 3, 4, 5]);
  const [episodePerPage, setEpisodePerPage] = useState(5);

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

  // pagination ekle. Her sayfada 5 episode goster. Next butonu ile bir sonraki sayfaya gec.
  // Multiple karakter eklemesi de yapilabilir. Doc ta var

  return (
    <View>
      <ScrollView>
        {episodes?.map(episode => {
          return (
            <EpisodeCard
              episode={episode}
              characters={episode.characters}
              key={episode.id}
            />
          );
        })}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
    </View>
  );
};

export default HomeScreen;
