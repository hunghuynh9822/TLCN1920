import { createStore, combineReducers } from 'redux';
import { layout, auth, project, tasks } from './reducers';

const reducers = combineReducers({
  layout, auth, project, tasks
});

const store = createStore(reducers);

export default store;