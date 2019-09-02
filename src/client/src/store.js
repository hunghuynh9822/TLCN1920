import { createStore, combineReducers } from 'redux';
import { layout } from './reducers';

const reducers = combineReducers({
  layout,
});

const store = createStore(reducers);

export default store;