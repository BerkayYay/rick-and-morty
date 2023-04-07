import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedCharacterId: null,
  selectedEpisodeId: null,
  favorites: [],
};

export const charAndEpSlice = createSlice({
  name: 'charAndEp',
  initialState,
  reducers: {
    setSelectedCharacterId: (state, action) => {
      state.selectedCharacterId = action.payload;
    },
    setSelectedEpisodeId: (state, action) => {
      state.selectedEpisodeId = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const {setSelectedCharacterId, setSelectedEpisodeId, setFavorites} =
  charAndEpSlice.actions;

export default charAndEpSlice.reducer;
