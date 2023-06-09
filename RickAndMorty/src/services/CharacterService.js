import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/character';

const getCharacters = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const getCharacterById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getCharacterByUrl = async url => {
  const response = await axios.get(url);
  return response.data;
};

export default {getCharacters, getCharacterById, getCharacterByUrl};
