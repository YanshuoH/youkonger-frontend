import React from 'react';
import { Route, Redirect } from 'react-router';
import Home from '../pages/Home/index';
import Layout from '../containers/Layout';

export default () => (
  <Route component={Layout}>
    <Route path="/" component={Home} />
    <Redirect from="*" to="/" />
  </Route>
);
