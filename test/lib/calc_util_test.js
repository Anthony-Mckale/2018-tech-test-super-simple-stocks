/* eslint-disable no-undef, no-unused-expressions */
import {
  calculateStockPrice,
  calculateDividendYield,
  calculateGeometricMean,
  calculatePERatio,
} from '../../src/app/lib/CalcUtil';

import { expect } from '../test_helper';

describe('CalcUtil', () => {
  describe('calculateStockPrice', () => {
    it('edge case: no trades', () => {
      const input = [];
      const output = calculateStockPrice(input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });

    it('basic', () => {
      const input = [
        {
          price: 100,
          quantity: 10,
        },
      ];
      const output = calculateStockPrice(input);
      const expectedOutput = 100;
      expect(output).to.equal(expectedOutput);
    });

    it('multi trade', () => {
      const input = [
        {
          price: 100,
          quantity: 50,
        },
        {
          price: 200,
          quantity: 50,
        },
      ];
      const output = calculateStockPrice(input);
      const expectedOutput = 150; // (100 * 50 + 200 * 50) / (50 + 50)
      expect(output).to.equal(expectedOutput);
    });
  });

  describe('calculateGeometricMean', () => {
    it('edge case: no values', () => {
      const input = [];
      const output = calculateGeometricMean(input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });
    it('basic', () => {
      const input = [100, 100, 100];
      const output = calculateGeometricMean(input);
      const expectedOutput = 100;
      // NOTE: closeTo due javascript doubles to float conversions == rounding errors
      // aka 0.1 + 0.2 !== 0.3
      expect(output).to.closeTo(expectedOutput, 0.00001);
    });
    // https://en.wikipedia.org/wiki/Geometric_mean
    it('wikipedia example', () => {
      const input = [4, 1, 1 / 32];
      const output = calculateGeometricMean(input);
      const expectedOutput = 0.5;
      // NOTE: closeTo due javascript doubles to float conversions == rounding errors
      // aka 0.1 + 0.2 !== 0.3
      expect(output).to.closeTo(expectedOutput, 0.00001);
    });
  });
  describe('calculatePERatio', () => {
    it('edge case: COMMON dividend is 0', () => {
      const input = {
        type: 'COMMON',
        lastDividend: 0,
        stockPrice: 100,
      };
      const output = calculatePERatio(input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });
    it('basic : COMMON stock === dividend', () => {
      const input = {
        type: 'COMMON',
        lastDividend: 100,
        stockPrice: 100,
      };
      const output = calculatePERatio(input);
      const expectedOutput = 1;
      expect(output).to.equal(expectedOutput);
    });
    it('basic : COMMON stock > dividend', () => {
      const input = {
        type: 'COMMON',
        lastDividend: 160,
        stockPrice: 100,
      };
      const output = calculatePERatio(input);
      const expectedOutput = 0.625;
      expect(output).to.equal(expectedOutput);
    });
    it('basic : PREFERRED stock > dividend', () => {
      const input = {
        type: 'PREFERRED',
        fixedDividend: 1.6, // 160%
        parValue: 100,
        stockPrice: 100,
      };
      const output = calculatePERatio(input);
      const expectedOutput = 0.625;
      expect(output).to.equal(expectedOutput);
    });
  });
  describe('calculateDividendYield', () => {
    it('edge case: COMMON stockPrice is 0', () => {
      const input = {
        type: 'COMMON',
        lastDividend: 0,
        fixedDividend: null,
        parValue: null,
        stockPrice: 0,
      };
      const output = calculateDividendYield(input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });
    it('edge case: PREFERRED stockPrice is 0', () => {
      const input = {
        type: 'PREFERRED',
        lastDividend: null,
        fixedDividend: 0,
        parValue: 0,
        stockPrice: 0,
      };
      const output = calculateDividendYield(input);
      const expectedOutput = 0;
      expect(output).to.equal(expectedOutput);
    });
    it('basic COMMON', () => {
      const input = {
        type: 'COMMON',
        lastDividend: 10,
        fixedDividend: null,
        parValue: null,
        stockPrice: 100,
      };
      const output = calculateDividendYield(input);
      const expectedOutput = 0.1;
      expect(output).to.equal(expectedOutput);
    });
    it('basic PREFERRED', () => {
      const input = {
        type: 'PREFERRED',
        lastDividend: null,
        fixedDividend: 0.02,
        parValue: 100,
        stockPrice: 100,
      };
      const output = calculateDividendYield(input);
      const expectedOutput = 0.02;
      expect(output).to.equal(expectedOutput);
    });
  });
});
