import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'

import configureStore from './stores/configureStore';

// Components
import Main from './components/Main';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
      <Route path="/" category="top" component={Main} />
    </Router>
  </Provider>, document.getElementById('root'));
