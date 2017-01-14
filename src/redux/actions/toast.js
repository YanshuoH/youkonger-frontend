import {
  TOAST_SHOW,
  TOAST_HIDE,
} from '../../constants';

export function showToast(message) {
  return {
    type: TOAST_SHOW,
    payload: {
      message,
      show: true,
    }
  };
}

export function hideToast() {
  return {
    type: TOAST_HIDE,
    payload: {
      message: '',
      show: false,
    }
  };
}
