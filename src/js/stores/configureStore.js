import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from '../reducer'
import { combineReducers } from 'redux'

export default function configureStore() {
  const createStoreWithMiddleware = compose(
        applyMiddleware(thunkMiddleware),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
    )(createStore);

  const store = createStoreWithMiddleware(combineReducers(reducers));
  return store
}
