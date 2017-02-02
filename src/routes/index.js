import React from 'react';
import { Route, Redirect } from 'react-router';
import Home from '../pages/Home';
import Edit from '../pages/Edit';
import Admin from '../pages/Admin';
import Participate from '../pages/Participate';
import Layout from '../containers/Layout';

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
    <Route path="/event/:uuid/admin/:hash" component={Admin} />
    <Redirect from="*" to="/" />
  </Route>
);
