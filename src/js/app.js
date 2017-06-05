import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'

import configureStore from './stores/configureStore';

// Components
import Main from './components/Main';

const store = configureStore();
const history = useRouterHistory(createHashHistory)({ queryKey: false });

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" category="top" component={Main}>
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));
