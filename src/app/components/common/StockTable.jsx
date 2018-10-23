import React from 'react';
import { connect } from 'react-redux';
import {
  calculateDividendYield,
  calculateIndexStockPrice,
  calculatePERatio,
} from '../../lib/CalcUtil';

// function StockTable() {
//   return (
//     <div>
//       <h2>Stocks</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr></tr>
//         </thead>
//         <tbody>
//           <tr></tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
//
// export default StockTable;


// import moment from 'moment';
// let moment = moment().subtract(15, 'minutes');

const StockTable = ({ stocks }) => (
  <div>
    <h2>Stocks</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Type</th>
          <th>Last Dividend</th>
          <th>Fixed Dividend</th>
          <th>Par Value</th>
          <th>Dividend Yield</th>
          <th>P/E Ratio</th>
          <th>Stock Price</th>
        </tr>
      </thead>
      <tbody>
      {
        stocks && stocks.length ?
          stocks.map((stock, index) => {
            return (<tr key={`${stock.symbol}-${index}`}>
              <td>{stock.symbol}</td>
              <td>{stock.type}</td>
              <td>{stock.lastDividend}</td>
              <td>{stock.fixedDividend}</td>
              <td>{stock.parValue}</td>
              <td>{calculateDividendYield(stock)}</td>
              <td>{calculatePERatio(stock)}</td>
              <td>{stock.stockPrice}</td>
            </tr>);
          }) :
          <tr>
            <td colSpan="8" ><em>No Data</em></td>
          </tr>
      }
      {
        stocks && stocks.length ?
          <tr key={'all-share-index'}>
            <td colSpan="7"><strong>GBCE All Share Index</strong></td>
            <td><strong>{calculateIndexStockPrice(stocks)}</strong></td>
          </tr>
          : ''
      }
      </tbody>
    </table>
  </div>
);

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks.stocks,
  };
};

export default connect(
  mapStateToProps,
  {}
)(StockTable);
