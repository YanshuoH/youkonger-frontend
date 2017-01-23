import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import toast from './reducers/toast';
import create from './reducers/create';
import participate from './reducers/participate';
import ssr from './reducers/ssr';

export default combineReducers({
  create,
  toast,
  participate,
  ssr,
  routing: routerReducer,
});
