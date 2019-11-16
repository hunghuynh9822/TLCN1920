import { createStore, combineReducers } from 'redux';
import { layout, auth, project } from './reducers';

const reducers = combineReducers({
  layout, auth, project
});

const store = createStore(reducers);

export default store;