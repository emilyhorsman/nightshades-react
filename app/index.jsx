import 'babel-core/polyfill'

import React from 'react'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import createLogger from 'redux-logger'

import { fetchJSONMiddleware, UnitMiddleware } from './middleware'
import App from './containers/App'
import root from './reducers'

const loggerMiddleware = createLogger()
const devToolsWrapper  = window.devToolsExtension ? window.devToolsExtension() : f => f

const createFinalStore = compose(
  applyMiddleware(
    fetchJSONMiddleware,
    UnitMiddleware,
    loggerMiddleware
  ),

  devToolsWrapper
)(createStore)
const store = createFinalStore(root)

render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('app'))
