import { createStore, combineReducers } from 'redux';
import { layout,auth } from './reducers';

const reducers = combineReducers({
  layout,auth
});

const store = createStore(reducers);

export default store;