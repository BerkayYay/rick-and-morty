import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedCharacterId: null,
  episodeId: null,
};

export const charAndEpSlice = createSlice({
  name: 'charAndEp',
  initialState,
  reducers: {
    setSelectedCharacterId: (state, action) => {
      state.selectedCharacterId = action.payload;
    },
    setEpisodeId: (state, action) => {
      state.episodeId = action.payload;
    },
  },
});

export const {setSelectedCharacterId, setEpisodeId} = charAndEpSlice.actions;

export default charAndEpSlice.reducer;
