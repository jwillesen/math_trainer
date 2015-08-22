require('bootstrap/dist/css/bootstrap.css')
require('imports?jQuery=jquery!bootstrap/dist/js/bootstrap.js')

import React from 'react'

import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import promiser from 'redux-promise'
import thunker from 'redux-thunk'
import createLogger from 'redux-logger'

import App from './app'
import reducer from './reducer'

document.addEventListener('DOMContentLoaded', () => {
  const middleware = [
    thunker,
    promiser,
    createLogger(),
  ]

  const createStoreWithMiddleware = applyMiddleware.apply(this, middleware)(createStore)
  const store = createStoreWithMiddleware(reducer)

  React.render(
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    document.body)
})
