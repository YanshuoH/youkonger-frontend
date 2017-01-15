import { combineReducers } from 'redux';
import event from './reducers/event';
import toast from './reducers/toast';
import create from './reducers/create';

export default combineReducers({
  event,
  create,
  toast
});
