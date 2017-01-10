import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';
import Home from '../components/Home';

export default () => (
  <Route>
    <Route path="/" component={Home} />
    <Redirect from="*" to="/" />
  </Route>
);
