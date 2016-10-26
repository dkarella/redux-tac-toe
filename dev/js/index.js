import 'babel-polyfill'; // babel backwards compatible
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import App from './components/app'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const store = createStore(allReducers);

const Root = props => {
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
