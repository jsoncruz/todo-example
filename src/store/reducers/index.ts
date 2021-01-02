import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import todo from './todo';

const todoPersistConfig = {
  key: 'todo',
  storage,
};

const reducers = combineReducers({
  todo: persistReducer(todoPersistConfig, todo),
});

export default reducers;
