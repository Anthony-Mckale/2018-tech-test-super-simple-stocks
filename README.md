# JP Morgan Technical Test
# Anthony McKale 22nd October : Super Simple Stocks

## Requirements

````
Provide working source code that will :-

 a.	For a given stock, 
  i.	calculate the dividend yield
  ii.	calculate the P/E Ratio
  iii.	record a trade, with timestamp, quantity of shares, buy or sell indicator and price
  iv.	Calculate Stock Price based on trades recorded in past 15 minutes
 b.	Calculate the GBCE All Share Index using the geometric mean of prices for all stocks
````


Apologises for late delivery, combination of having to do early morning indian and late evening american knowledge transfers finishing up on the current job, and a badly timed flu delayed me getting this done


## Provided :

- unit tested library for calculations asked for above
  test/lib/calc_util_test.js

  (only tested libs for simple test, but next steps would be adding ui / cucumber integration)

- simple data grid with stock displayed + index

- simple trading audit table

- simple random data generator

- simple sell / buy interface for adding new records

- very simple refresh every minute, of stock prices, using trades within the last 15 minutes

## Built using :
- redux + react skeleton https://github.com/DimiMikadze/express-react-redux-starter/tree/master/dist
- intellij


## Install instructions:

- requires node / npm pre-installed

````
- download from git
- go to folder in cmd
npm install
npm run dev

- go to http://localhost:3000/
````

Additional Commands

````
- for linting
npm run lint

- for testing
npm run test
````

## Caveats:

1. Was not sure if live data feeds were to be requested and processed or a synthetic client side experience with fake data was to be implemented was desired, 

   went for the second option

2. Also as soon as I started using starter kit noticed it was quite old (not even on babel 7 / babel-preset-env!), beyond scope of exercise to fix starter kit
   
   removed SCSS from starter kit to make install easier for reviewers / replaced with off shelf bootstrap css (gets rid of python / node-gyp dependencies)

3. Was not sure what the difference between a ticker price and calculated stock price was, made assumption these are the same things

4. This implementation is pure javascript, no Java / Dot net etc

## Possible Improvements

- ui tests
- validation
- formatting
- currency / locale awareness
- design
- create middleware to link up to dynamic feeds
- update skeleton project (better babel / improve linting etc)