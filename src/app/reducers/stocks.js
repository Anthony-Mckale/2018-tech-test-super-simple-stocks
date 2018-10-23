import {
  ADD_TRADE,
  GENERATE_FAKE_TRADES,
  SET_INITIAL_STOCKS,
  UPDATE_STOCK_PRICES,
} from '../actions/actionTypes';
import { immutablyUpdateStockPrices } from '../lib/CalcUtil';
import each from 'lodash/each';
import moment from 'moment';

const INITIAL_STOCKS = [
  {
    symbol: 'TEA',
    type: 'COMMON',
    lastDividend: 0,
    fixedDividend: null,
    parValue: 100,
  },
  {
    symbol: 'POP',
    type: 'COMMON',
    lastDividend: 8,
    fixedDividend: null,
    parValue: 100,
  },
  {
    symbol: 'ALE',
    type: 'COMMON',
    lastDividend: 23,
    fixedDividend: null,
    parValue: 60,
  },
  {
    symbol: 'GIN',
    type: 'PREFERRED',
    lastDividend: 8,
    fixedDividend: 0.02,
    parValue: 100,
  },
  {
    symbol: 'JOE',
    type: 'COMMON',
    lastDividend: 13,
    fixedDividend: null,
    parValue: 250,
  },
];

export default function (state = {}, action) {
  switch (action.type) {
    case SET_INITIAL_STOCKS: {
      return Object.assign({}, state, {
        stocks: immutablyUpdateStockPrices(INITIAL_STOCKS, [], action.validFromTime),
        trades: [],
      });
    }
    case UPDATE_STOCK_PRICES: {
      const stocks = state.stocks || [];
      const trades = state.trades || [];
      return Object.assign({}, state, {
        stocks: immutablyUpdateStockPrices(stocks, trades, action.validFromTime),
      });
    }
    case GENERATE_FAKE_TRADES: {
      // deserialize moment
      const nowMoment = moment(action.now, 'YYYY-MM-DDTHH-mm');

      // Create 15 minutes of data, frequency one data point per minute
      const fakeTrades = [];
      const stocks = state.stocks || [];
      each(stocks, (stock) => {
        const startingPrice = 50 + Math.random() * 100;
        const speed = 1 + Math.random() * 6;
        let price = startingPrice;
        for (let i = 0; i < 15; i++) {
          const timeStamp = nowMoment.clone().subtract(i, 'minutes');
          fakeTrades.push({
            time: timeStamp.format('YYYY-MM-DDTHH-mm'),
            symbol: stock.symbol,
            type: Math.random() > 0.5 ? 'SELL' : 'BUY',
            price: Math.round(price),
            quantity: Math.round(50 + (Math.random() * 100)),
          });
          price += Math.random() * 10 * speed;
        }
      });
      fakeTrades.sort((a, b) => { return a.time < b.time ? 1 : -1; });

      // update stock prices
      return Object.assign({}, state, {
        trades: fakeTrades,
        stocks: immutablyUpdateStockPrices(stocks, fakeTrades, action.validFromTime),
      });
    }
    case ADD_TRADE: {
      const newTrade = {
        time: action.now,
        symbol: action.newTrade.symbol,
        type: action.newTrade.type,
        price: Math.round(action.newTrade.price),
        quantity: Math.round(Math.round(action.newTrade.quantity)),
      };

      const newState = Object.assign({}, state);
      newState.trades = [newTrade].concat(newState.trades);
      newState.stocks = immutablyUpdateStockPrices(
        newState.stocks,
        newState.trades,
        action.validFromTime
      );
      return newState;
    }
    default:
      return state;
  }
}
