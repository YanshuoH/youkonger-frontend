import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { browserHistory } from 'react-router';
import 'weui/dist/style/weui.min.css';
import 'react-weui/lib/react-weui.min.css';
import 'font-awesome/css/font-awesome.min.css';

// project dep
import makeRoutes from './routes';
import configureStore from './redux/configureStore';
import Root from './containers/Root';
import './styles/app.less';
// moment localization
moment.locale('zh-cn');

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

ReactDOM.render(
  <Root history={browserHistory} routes={makeRoutes()} store={store} />,
  document.getElementById('root')
);
