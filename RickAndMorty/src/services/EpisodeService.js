// Rick and Morty Episode Service
// This service is responsible for fetching episode data from the Rick and Morty API
// and returning it to the caller.

import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/episode';

const getEpisodes = async episodes => {
  const response = await axios.get(`${baseUrl}/${episodes}`);
  // return array of episodes from response object
  return response.data;
};

const getEpisodeByUrl = async url => {
  const response = await axios.get(url);
  // return array of episodes from response object
  return response.data;
};

export default {getEpisodes, getEpisodeByUrl};
