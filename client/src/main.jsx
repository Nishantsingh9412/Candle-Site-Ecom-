import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk'
import App from './App.jsx'
import './index.css'
import Reducers from './redux/reducers/index.js';

// import store from './store'
const store = createStore(Reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)