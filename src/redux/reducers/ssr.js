import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  isSSR: window.__IS_SSR__,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      // escape from ssr, fully control by client app
      if (action.payload.pathname === '/' || action.payload.pathname.indexOf('/create') > -1) {
        state.isSSR = false;
        window.__IS_SSR__ = false;
      }
      return state;
    default:
      return state;
  }
}
