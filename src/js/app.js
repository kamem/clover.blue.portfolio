import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

import configureStore from './stores/configureStore'

// Components
import App from './containers/App'
import Main from './containers/Main'
import About from './containers/About'
import Qiita from './containers/Qiita'
import Dropbox from './containers/Dropbox'
import Instagram from './containers/Instagram'
import Tag from './containers/Tag'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onChange={() => {window.scrollTo(0, 0)}}>
        <IndexRoute component={Main} category="main" />
        <Route path="items/:item_id" category="item" component={Qiita} />
        <Route path="doc/:item_id" category="doc" component={Dropbox} />
        <Route path="p/:item_id" category="doc" component={Instagram} />
        <Route path="tags/:tag_id" category="tag" component={Tag} />
        <Route path="about" category="about" component={About} />
      </Route>
    </Router>
  </Provider>, document.getElementById('root'))
