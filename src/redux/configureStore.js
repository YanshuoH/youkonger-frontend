import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import toast from '../middlewares/toast';
import rootReducer from './rootReducer';

export default function configureStore(initialState = {}) {
  // Compose final middleware and use devtools in debug environment
  const middleware = applyMiddleware(thunk, toast);

  // Create final store and subscribe router in debug env ie. for devtools
  let store = middleware(createStore)(rootReducer, initialState);
  if (__DEBUG__) {
    store = middleware(createStore)(
      rootReducer,
      initialState,
      window.devToolsExtension && window.devToolsExtension()
    );
  }

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
