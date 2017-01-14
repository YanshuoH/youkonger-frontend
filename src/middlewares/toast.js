import {
  showToast,
  hideToast,
} from '../redux/actions/toast';

const toaster = store => next => (action) => {
  if (action
    && action.payload
    && Object.prototype.hasOwnProperty.call(action.payload, 'error')) {
    let msg = '发生了未知错误, 请稍后再试';
    if (Object.prototype.hasOwnProperty.call(action.payload.error, 'resultDescription')) {
      msg = action.payload.error.resultDescription;
    }
    store.dispatch(showToast(msg));
    setTimeout(() => {
      store.dispatch(hideToast());
    }, 2000);
  }

  next(action);
};

export default toaster;
