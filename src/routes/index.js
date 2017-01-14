import React from 'react';
import { Route, Redirect } from 'react-router';
import Home from '../pages/Home';
import Edit from '../pages/Edit';
import Layout from '../containers/Layout';

export default () => (
  <Route component={Layout}>
    <Route path="/" component={Home} />
    <Route path="/create" component={Edit} />
    <Route path="/event/:uuid/admin/:hash" component={Edit} />
    <Redirect from="*" to="/" />
  </Route>
);
