import each from 'lodash/each';
import map from 'lodash/map';
import filter from 'lodash/filter';

/**
 * @param {Object} stock
 * @returns {number} percentage 0-1
 */
function calculateCommonDividendYield(stock) {
  // assumption tickerPrice === stockPrice
  if (stock.stockPrice === 0) {
    return 0;
  }
  return stock.lastDividend / stock.stockPrice;
}

/**
 * @param {Object} stock
 * @returns {number} percentage 0-1
 */
function calculatePreferredDividendYield(stock) {
  // assumption tickerPrice === stockPrice
  if (stock.stockPrice === 0) {
    return 0;
  }
  return (stock.fixedDividend * stock.parValue) / stock.stockPrice;
}

/**
 * @param {Object} stock
 * @returns {number} percentage 0-1
 */
export function calculateDividendYield(stock) {
  return stock.type === 'COMMON' ?
    calculateCommonDividendYield(stock) :
    calculatePreferredDividendYield(stock);
}

/**
 * @param {Object} stock
 * @returns {number} percentage 0-1
 */
export function calculatePERatio(stock) {
  const dividend = stock.type === 'COMMON' ?
    stock.lastDividend :
    stock.fixedDividend * stock.parValue;
  if (dividend === 0 ||
    stock.stockPrice === 0) {
    return 0;
  }
  return stock.stockPrice / dividend;
}

/**
 * // NOTE: javascript is very bad at counting, would move to "rounding" safer implementation
 * if doing this for lots of values
 *
 * @param {Number[]} values
 * @returns {number}
 */
export function calculateGeometricMean(values) {
  if (values.length === 0) {
    return 0;
  }
  let total = null;
  // NOTE: using lodash each
  // typically faster (due to 'while' loop implementation) / easier to understand
  each(values, (value) => {
    // first number
    if (total === null) {
      total = value;
      return;
    }
    total *= value;
  });
  const mean = Math.pow(total, 1 / values.length);
  return mean;
}

/**
 * @param {Object[]} trades
 * @returns {number}
 */
export function calculateStockPrice(trades) {
  let totalCostOfShares = 0;
  each(trades, (trade) => {
    totalCostOfShares += trade.price * trade.quantity;
  });
  let numberOfShares = 0;
  each(trades, (trade) => {
    numberOfShares += trade.quantity;
  });
  if (numberOfShares === 0) {
    return 0;
  }
  const stockPrice = totalCostOfShares / numberOfShares;
  return stockPrice;
}

/**
 * @param {Object[]} stocks
 * @returns {number}
 */
export function calculateIndexStockPrice(stocks) {
  const stockPrices = map(stocks, 'stockPrice');
  return calculateGeometricMean(stockPrices);
}

/**
 * @param {Object} oldStocks
 * @param {Object[]} trades
 * @param {String} startTime ISO date string
 * @returns {Object[]} stocks
 */
export function immutablyUpdateStockPrices(oldStocks, trades, startTime) {
  const stocks = [];
  each(oldStocks, (stock) => {
    const stockTrades = filter(trades, (trade) => {
      const isCorrectSymbol = trade.symbol === stock.symbol;
      const isAfterCutoff = trade.time > startTime;
      return isCorrectSymbol && isAfterCutoff;
    });
    stocks.push(Object.assign({}, stock, {
      stockPrice: calculateStockPrice(stockTrades),
    }));
  });
  return stocks;
}
