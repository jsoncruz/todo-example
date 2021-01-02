import { createStore } from 'redux';
import { persistStore } from 'redux-persist';

import reducers from './reducers';
import { TodoStateProps } from './reducers/todo';

export interface RootReducerProps {
  todo: TodoStateProps;
}

const store = createStore(reducers);

export default store;

export const persistor = persistStore(store);
