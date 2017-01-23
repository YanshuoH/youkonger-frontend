import React from 'react';
import { Route, Redirect } from 'react-router';
import Home from '../pages/Home';
import Edit from '../pages/Edit';
import Participate from '../pages/Participate';
import Layout from '../containers/Layout';
import Clipboard from '../components/Clipboard';

export default () => (
  <Route component={Layout}>
    <Route path="/" component={Home} />
    <Route path="/create" component={Edit} />
    <Route
      path="/event/:uuid"
      getComponent={(nextState, cb) => {
        if (!window.__IS_SSR__) {
          cb(null, Edit);
        } else {
          cb(null, Participate);
        }
      }}
    />
    <Route path="/test" component={Clipboard} />
    <Redirect from="*" to="/" />
  </Route>
);
