import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import makeRoutes from './routes';
import configureStore from './redux/configureStore';
import Root from './containers/Root';
import './app.less';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

ReactDOM.render(
  <Root history={browserHistory} routes={makeRoutes()} store={store} />,
  document.getElementById('root')
);
