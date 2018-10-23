import React from 'react';
import StockTable from '../common/StockTable';
import TradesTable from '../common/TradesTable';
import CreateRandomTradeData from '../common/CreateRandomTradeData';
import CreateTrade from '../common/CreateTrade';

function SimpleStocks() {
  return (
    <div className="container home">
      <CreateRandomTradeData />
      <CreateTrade />
      <StockTable />
      <TradesTable />
    </div>
  );
}

export default SimpleStocks;
