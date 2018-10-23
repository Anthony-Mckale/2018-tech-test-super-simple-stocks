import React from 'react';
import { connect } from 'react-redux';

const TradesTable = ({ trades }) => (
  <div>
    <h2>Trades</h2>
    <div className="table-responsive">
      {/* in production obviously would use component sass or common compiled bem sass */}
      <table className="table table-striped" style={{ height: '400px' }}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Stock Symbol</th>
            <th>Buy / Sell</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
        {
          trades && trades.length ?
            trades.map((trade, index) => {
              return (<tr key={`${trade.symbol}-${index}`}>
                <td>{trade.time}</td>
                <td>{trade.symbol}</td>
                <td>{trade.type}</td>
                <td>{trade.price}</td>
                <td>{trade.quantity}</td>
              </tr>);
            }) :
            <tr>
              <td colSpan="8" ><em>No Trades Data</em></td>
            </tr>
        }
        </tbody>
      </table>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    trades: state.stocks.trades,
  };
};

export default connect(
  mapStateToProps,
  null
)(TradesTable);
