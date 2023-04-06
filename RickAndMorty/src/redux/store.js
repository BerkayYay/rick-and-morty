import {configureStore} from '@reduxjs/toolkit';
import charAndEpReducer from './reducers';

export default configureStore({
  reducer: {
    charAndEp: charAndEpReducer,
  },
});
