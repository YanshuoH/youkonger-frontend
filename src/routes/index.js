import React from 'react';
import { Route, Redirect } from 'react-router';
import Home from '../pages/Home';
import Creation from '../pages/Edit';
import Layout from '../containers/Layout';

export default () => (
  <Route component={Layout}>
    <Route path="/" component={Home} />
    <Route path="/create" component={Creation} />
    <Redirect from="*" to="/" />
  </Route>
);
