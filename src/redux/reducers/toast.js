import {
  TOAST_SHOW,
  TOAST_HIDE,
} from '../../constants';

const initialState = {
  show: false,
  message: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOAST_SHOW:
      return Object.assign({}, state, action.payload);
    case TOAST_HIDE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
