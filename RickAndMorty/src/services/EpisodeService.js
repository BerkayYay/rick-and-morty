import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/episode';

const getEpisodes = async episodes => {
  const response = await axios.get(`${baseUrl}/${episodes}`);
  return response.data;
};

const getEpisodeByUrl = async url => {
  const response = await axios.get(url);
  return response.data;
};

export default {getEpisodes, getEpisodeByUrl};
