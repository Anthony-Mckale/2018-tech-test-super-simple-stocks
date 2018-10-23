import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import SimpleStocks from './components/stocks/SimpleStocks';

import reducers from './reducers';
import { SET_INITIAL_STOCKS, UPDATE_STOCK_PRICES } from './actions/actionTypes';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

store.dispatch({
  type: SET_INITIAL_STOCKS,
  validFromTime: moment().subtract(15, 'minutes').format('YYYY-MM-DDTHH-mm'),
});

// Game loop, update stock prices every 60 seconds
// would ideally add this to App.jsx but this is just a tech demo
setInterval(() => {
  store.dispatch({
    type: UPDATE_STOCK_PRICES,
    validFromTime: moment().subtract(15, 'minutes').format('YYYY-MM-DDTHH-mm'),
  });
}, 60 * 1000);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SimpleStocks} />;
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
