import {
  calculateCompoundInterest,
  calculateFinalBalance,
  calculateSimpleInterest,
} from './calculator';
import {
  INTEREST_RATE_MAX,
  INTEREST_RATE_MIN,
  INVESTMENT_TERM_MAX,
  INVESTMENT_TERM_MIN,
  STARTING_AMOUNT_MAX,
  STARTING_AMOUNT_MIN,
} from './constants';
import { InterestPaid } from './types';

describe('calculateSimpleInterest', () => {
  test('calculates the correct interest amount', () => {
    expect(calculateSimpleInterest(1000, 0, 0.25)).toEqual(1000);
    expect(calculateSimpleInterest(1500000, 0.15, 5)).toEqual(2625000);
  });
});

describe('calculateCompoundInterest', () => {
  test('calculates the correct interest amount when interest is paid monthly', () => {
    expect(
      calculateCompoundInterest(1000, 0, 0.25, InterestPaid.Monthly),
    ).toEqual(1000);
    expect(
      calculateCompoundInterest(1500000, 0.15, 5, InterestPaid.Monthly),
    ).toEqual(3160772);
  });

  test('calculates the correct interest amount when interest is paid quarterly', () => {
    expect(
      calculateCompoundInterest(1000, 0, 0.25, InterestPaid.Quarterly),
    ).toEqual(1000);
    expect(
      calculateCompoundInterest(1500000, 0.15, 5, InterestPaid.Quarterly),
    ).toEqual(3132228);
  });

  test('calculates the correct interest amount when interest is paid annually', () => {
    expect(
      calculateCompoundInterest(1000, 0, 0.25, InterestPaid.Annually),
    ).toEqual(1000);
    expect(
      calculateCompoundInterest(1500000, 0.15, 5, InterestPaid.Annually),
    ).toEqual(3017036);
  });
});

describe('calculateFinalBalance', () => {
  test('throws an error when startingAmount is NaN', () => {
    expect(() =>
      calculateFinalBalance(NaN, 1.1, 36, InterestPaid.AtMaturity),
    ).toThrowError(
      `Please enter a valid starting amount between $1000 and $1500000 (e.g. 10000)`,
    );
  });

  test(`throws an error when startingAmount is less than ${STARTING_AMOUNT_MIN}`, () => {
    expect(() =>
      calculateFinalBalance(999, 1.1, 36, InterestPaid.AtMaturity),
    ).toThrowError(
      `Please enter a valid starting amount between $1000 and $1500000 (e.g. 10000)`,
    );
  });

  test(`throws an error when startingAmount is greater than ${STARTING_AMOUNT_MAX}`, () => {
    expect(() =>
      calculateFinalBalance(1500001, 1.1, 36, InterestPaid.AtMaturity),
    ).toThrowError(
      `Please enter a valid starting amount between $1000 and $1500000 (e.g. 10000)`,
    );
  });

  test('throws an error when interestRate is NaN', () => {
    expect(() =>
      calculateFinalBalance(10000, NaN, 36, InterestPaid.AtMaturity),
    ).toThrowError(
      `Please enter a valid interest rate between 0% and 15% (e.g. 1.1)`,
    );
  });

  test(`throws an error when interestRate is less than ${INTEREST_RATE_MIN}`, () => {
    expect(() =>
      calculateFinalBalance(10000, -0.1, 36, InterestPaid.AtMaturity),
    ).toThrowError(
      `Please enter a valid interest rate between 0% and 15% (e.g. 1.1)`,
    );
  });

  test(`throws an error when interestRate is greater than ${INTEREST_RATE_MAX}`, () => {
    expect(() =>
      calculateFinalBalance(10000, 15.1, 36, InterestPaid.AtMaturity),
    ).toThrowError(
      `Please enter a valid interest rate between 0% and 15% (e.g. 1.1)`,
    );
  });

  test('throws an error when investmentTerm is NaN', () => {
    expect(() =>
      calculateFinalBalance(10000, 1.1, NaN, InterestPaid.AtMaturity),
    ).toThrowError(
      `Please enter a valid investment term between 3 and 60 months (e.g. 36)`,
    );
  });

  test(`throws an error when investmentTerm is less than ${INVESTMENT_TERM_MIN}`, () => {
    expect(() =>
      calculateFinalBalance(10000, 1.1, 2, InterestPaid.AtMaturity),
    ).toThrowError(
      `Please enter a valid investment term between 3 and 60 months (e.g. 36)`,
    );
  });

  test(`throws an error when investmentTerm is greater than ${INVESTMENT_TERM_MAX}`, () => {
    expect(() =>
      calculateFinalBalance(10000, 1.1, 61, InterestPaid.AtMaturity),
    ).toThrowError(
      `Please enter a valid investment term between 3 and 60 months (e.g. 36)`,
    );
  });

  test('throws an error if interestPaid is not a valid option', () => {
    expect(() =>
      calculateFinalBalance(10000, 1.1, 36, 'DAILY' as InterestPaid),
    ).toThrowError(
      'Please select a valid interest paid option (i.e. Monthly, Quarterly, Annually or At maturity)',
    );
  });

  test('calculates the correct final balance when interest is paid monthly', () => {
    const finalBalance = calculateFinalBalance(
      10000,
      1.1,
      36,
      InterestPaid.Monthly,
    );
    expect(finalBalance).toEqual(10335);
  });

  test('calculates the correct final balance when interest is paid quarterly', () => {
    const finalBalance = calculateFinalBalance(
      10000,
      1.1,
      36,
      InterestPaid.Monthly,
    );
    expect(finalBalance).toEqual(10335);
  });

  test('calculates the correct final balance when interest is paid annually', () => {
    const finalBalance = calculateFinalBalance(
      10000,
      1.1,
      36,
      InterestPaid.Annually,
    );
    expect(finalBalance).toEqual(10334);
  });

  test('calculates the correct final balance when interest is paid at maturity', () => {
    const finalBalance = calculateFinalBalance(
      10000,
      1.1,
      36,
      InterestPaid.AtMaturity,
    );
    expect(finalBalance).toEqual(10330);
  });
});
