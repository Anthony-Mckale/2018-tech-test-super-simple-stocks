import React from 'react';
import { connect } from 'react-redux';
import { GENERATE_FAKE_TRADES } from '../../actions/actionTypes';
import moment from 'moment';

const CreateRandomTradeData = ({ createRandomData }) => (
  <div>
    <h2>Create Random Data</h2>
    <button className="btn btn-primary" onClick={createRandomData}>
      Generate 15 Mins of fake Trade information
    </button>
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    createRandomData: (event) => {
      event.preventDefault();
      dispatch({
        type: GENERATE_FAKE_TRADES,
        now: moment().format('YYYY-MM-DDTHH-mm'),
        validFromTime: moment().subtract(15, 'minutes').format('YYYY-MM-DDTHH-mm'),
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateRandomTradeData);

