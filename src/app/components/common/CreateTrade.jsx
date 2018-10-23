import React from 'react';
import { connect } from 'react-redux';
import { ADD_TRADE } from '../../actions/actionTypes';
import moment from 'moment';

class CreateTrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: 'TEA',
      type: 'BUY',
      price: '123',
      quantity: '456',
    };
  }

  updateInput = (field, value) => {
    const clone = Object.assign({}, this.state);
    clone[field] = value;
    this.setState(clone);
  };

  addTrade = (event) => {
    event.preventDefault();
    this.props.addTrade(this.state);
  };

  render() {
    return (
      <div>
        <h2>Create Trade</h2>
        <form className="form-inline">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">Stock Symbol</div>
              <input
                type="text"
                className="form-control"
                placeholder="Stock Symbol"
                onChange={e => this.updateInput('symbol', e.target.value)}
                value={this.state.symbol}
              />
              <div className="input-group-addon">Buy / Sell</div>
              <input
                type="text"
                className="form-control"
                placeholder="BUY or SELL"
                onChange={e => this.updateInput('type', e.target.value)}
                value={this.state.type}
              />
              <div className="input-group-addon">Price</div>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                onChange={e => this.updateInput('price', e.target.value)}
                value={this.state.price}
              />
              <div className="input-group-addon">Quantity</div>
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
                onChange={e => this.updateInput('quantity', e.target.value)}
                value={this.state.quantity}
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={this.addTrade}
          >Record New Trade</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTrade: (newTrade) => {
      dispatch({
        type: ADD_TRADE,
        newTrade,
        now: moment().format('YYYY-MM-DDTHH-mm'),
        validFromTime: moment().subtract(15, 'minutes').format('YYYY-MM-DDTHH-mm'),
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTrade);
