import { combineReducers } from 'redux';
import airports from './airports';
import route from './route';
import tickets from './tickets';

const rootReducer = combineReducers({
  airports: airports,
  route: route,
  tickets: tickets
});

export default rootReducer;
