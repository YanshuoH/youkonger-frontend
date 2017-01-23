import { combineReducers } from 'redux';
import toast from './reducers/toast';
import create from './reducers/create';
import participate from './reducers/participate';

export default combineReducers({
  create,
  toast,
  participate,
});
