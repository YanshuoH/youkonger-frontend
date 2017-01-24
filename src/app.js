import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { fromJS } from 'immutable';
import 'weui/dist/style/weui.min.css';
import 'react-weui/lib/react-weui.min.css';


// project dep
import makeRoutes from './routes';
import configureStore from './redux/configureStore';
import Root from './containers/Root';
import './styles/app.less';
// moment localization
moment.locale('zh-cn');

const initialState = window.__INITIAL_STATE__;
const store = configureStore(
  Object.assign({},
    initialState,
    { participate: fromJS(window.__INITIAL_PARTICIPATE_STATE__) },
  )
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Root history={history} routes={makeRoutes()} store={store} />,
  document.getElementById('root')
);
