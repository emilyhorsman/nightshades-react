import 'babel-core/polyfill'

import React from 'react'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import createLogger from 'redux-logger'

import App from './containers/App'
import root from './reducers'

const createFinalStore = compose(
  applyMiddleware(createLogger()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
const store = createFinalStore(root)

render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('app'))
