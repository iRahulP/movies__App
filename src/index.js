import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

//curried form of function :: {logger(obj, next, action)}
//logger(obj)(next)(action)
// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       //middleware code
//       console.log("ACTION_TYPE : ", action.type);
//       next(action);
//     }
//   }
// }

const logger = ({ dispatch, getState }) => (next) => (action) => {
  //logger code
  // console.log("ACTION_TYPE : ", action.type);
  next(action);
}

const thunk = ({ dispatch, getState }) => (next) => (action) => {
  //logger code
  if (typeof action == 'function') {
    action(dispatch);
    return;
  }
  next(action);
}

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store', store);

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);

