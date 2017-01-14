import { combineReducers } from 'redux';
import event from './reducers/event';
import toast from './reducers/toast';

export default combineReducers({
  event,
  toast
});
